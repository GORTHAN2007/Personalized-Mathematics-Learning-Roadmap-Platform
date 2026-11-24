import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Camera, 
  CameraOff, 
  Layers, 
  Compass, 
  Activity, 
  RefreshCw, 
  Sliders,
  CheckCircle2
} from 'lucide-react';

const SURFACES = [
  {
    id: 'saddle',
    name: 'Hyperbolic Paraboloid (Saddle)',
    formula: 'z = (x² - y²) / 4',
    evalZ: (x, y) => (x * x - y * y) / 4,
    derivatives: (x, y) => ({ dx: x / 2, dy: -y / 2 })
  },
  {
    id: 'paraboloid',
    name: 'Elliptic Paraboloid',
    formula: 'z = (x² + y²) / 4',
    evalZ: (x, y) => (x * x + y * y) / 4,
    derivatives: (x, y) => ({ dx: x / 2, dy: y / 2 })
  },
  {
    id: 'wave',
    name: 'Sinusoidal Ripple Field',
    formula: 'z = sin(√(x² + y²))',
    evalZ: (x, y) => {
      const r = Math.sqrt(x * x + y * y);
      return Math.sin(r);
    },
    derivatives: (x, y) => {
      const r = Math.sqrt(x * x + y * y) || 0.0001;
      const cosR = Math.cos(r);
      return { dx: cosR * (x / r), dy: cosR * (y / r) };
    }
  },
  {
    id: 'monkey',
    name: 'Monkey Saddle',
    formula: 'z = (x³ - 3xy²) / 6',
    evalZ: (x, y) => (x * x * x - 3 * x * y * y) / 6,
    derivatives: (x, y) => ({ dx: (x * x - y * y) / 2, dy: -x * y })
  }
];

export default function ARSurfaceExplorer() {
  const mountRef = useRef(null);
  const videoRef = useRef(null);

  // Surface & Calculus State
  const [selectedSurfaceId, setSelectedSurfaceId] = useState('saddle');
  const [wireframe, setWireframe] = useState(false);
  const [inspectPoint, setInspectPoint] = useState({ x: 1.0, y: 1.0, z: 0.0 });
  const [derivatives, setDerivatives] = useState({ dx: 0.5, dy: -0.5 });
  const [gradientNorm, setGradientNorm] = useState(0.707);

  // AR Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Three.js instances
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const meshRef = useRef(null);
  const markerRef = useRef(null);
  const normalArrowRef = useRef(null);
  const tangentPlaneRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const activeSurface = SURFACES.find(s => s.id === selectedSurfaceId) || SURFACES[0];

  // Start / Stop WebRTC Video Stream for AR Passthrough
  const toggleCamera = async () => {
    if (isCameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      setCameraError(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
        setCameraError(null);
      } catch (err) {
        console.warn('Camera AR passthrough unavailable:', err);
        setCameraError('Camera access unavailable. Using virtual AR Hologram backdrop.');
        setIsCameraActive(false);
      }
    }
  };

  // Build Parametric Surface Mesh
  const buildSurfaceGeometry = (surface) => {
    const size = 6;
    const segments = 45;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2); // Orient horizontally

    const pos = geo.attributes.position;
    const colors = [];
    const colorMin = new THREE.Color(0x38bdf8); // Sky Cyan
    const colorMid = new THREE.Color(0x818cf8); // Indigo
    const colorMax = new THREE.Color(0xf43f5e); // Coral Rose

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const zPlane = pos.getZ(i); // In Three.js plane, Y was vertical before rotateX
      const y = surface.evalZ(x, zPlane); // Calculated height
      pos.setY(i, y);

      // Vertex color gradient based on height
      const t = THREE.MathUtils.clamp((y + 2) / 4, 0, 1);
      const vertexColor = t < 0.5 
        ? colorMin.clone().lerp(colorMid, t * 2)
        : colorMid.clone().lerp(colorMax, (t - 0.5) * 2);
      colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  };

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    // In AR camera mode, scene background is transparent to expose video feed
    scene.background = isCameraActive ? null : new THREE.Color(0x0a0c16);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 5, 6);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    // 6. Hologram Grid Floor (hidden in live camera mode)
    const grid = new THREE.GridHelper(10, 20, 0x8b5cf6, 0x1e293b);
    grid.position.y = -2;
    scene.add(grid);

    // 7. Surface Mesh
    const geo = buildSurfaceGeometry(activeSurface);
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.35,
      metalness: 0.2,
      side: THREE.DoubleSide,
      wireframe: wireframe
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    meshRef.current = mesh;

    // 8. Interactive Touch Marker Sphere
    const markerGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    scene.add(marker);
    markerRef.current = marker;

    // 9. Gradient / Normal Vector Arrow Helper
    const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1.2, 0xfacc15, 0.3, 0.15);
    scene.add(arrow);
    normalArrowRef.current = arrow;

    // 10. Local Tangent Plane
    const tangentGeo = new THREE.PlaneGeometry(1.6, 1.6);
    const tangentMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      wireframe: true
    });
    const tangentPlane = new THREE.Mesh(tangentGeo, tangentMat);
    scene.add(tangentPlane);
    tangentPlaneRef.current = tangentPlane;

    // Initial evaluation at (1.0, 1.0)
    updateCalculusAt(1.0, 1.0, activeSurface);

    // 11. Raycasting on Pointer Click / Move
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      if (meshRef.current) {
        const intersects = raycaster.intersectObject(meshRef.current);
        if (intersects.length > 0) {
          const pt = intersects[0].point;
          updateCalculusAt(pt.x, pt.z, activeSurface);
        }
      }
    };
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, [selectedSurfaceId, wireframe, isCameraActive]);

  // Compute Partial Derivatives, Tangent Plane, and Normal Vector
  const updateCalculusAt = (x, yCoord, surface) => {
    // Note: In Three.js horizontal plane is X and Z
    const z = surface.evalZ(x, yCoord);
    const { dx, dy } = surface.derivatives(x, yCoord);
    const gradMagnitude = Math.sqrt(dx * dx + dy * dy);

    setInspectPoint({ x, y: yCoord, z });
    setDerivatives({ dx, dy });
    setGradientNorm(gradMagnitude);

    // 1. Move Marker Sphere to (x, z, yCoord)
    if (markerRef.current) {
      markerRef.current.position.set(x, z, yCoord);
    }

    // 2. Compute Normal Vector n = [-dx, 1, -dy] (normalized)
    const normal = new THREE.Vector3(-dx, 1, -dy).normalize();

    // 3. Update Gradient / Normal Vector Arrow
    if (normalArrowRef.current) {
      normalArrowRef.current.position.set(x, z, yCoord);
      normalArrowRef.current.setDirection(normal);
      normalArrowRef.current.setLength(1.4, 0.35, 0.18);
    }

    // 4. Orient Local Tangent Plane orthogonal to the normal vector
    if (tangentPlaneRef.current) {
      tangentPlaneRef.current.position.set(x, z, yCoord);
      const up = new THREE.Vector3(0, 0, 1);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, normal);
      tangentPlaneRef.current.setRotationFromQuaternion(quat);
    }
  };

  return (
    <div className="isd-body">
      {/* 3D Viewport with optional AR Camera Video Background */}
      <div className="isd-viewport-wrapper">
        <video ref={videoRef} className="isd-ar-video-bg" autoPlay playsInline muted />
        <div 
          ref={mountRef} 
          className={`isd-canvas-container ${isCameraActive ? 'has-ar-video' : ''}`}
        />

        {/* Viewport Telemetry HUD */}
        <div className="isd-viewport-hud">
          <div className="isd-hud-chip">
            <span style={{ color: '#38bdf8' }}>Point P(x, y, z):</span> ({inspectPoint.x.toFixed(2)}, {inspectPoint.y.toFixed(2)}, {inspectPoint.z.toFixed(2)})
            <br />
            <span style={{ color: '#facc15' }}>Gradient ∇f:</span> [{derivatives.dx.toFixed(2)}, {derivatives.dy.toFixed(2)}] | Slope: {gradientNorm.toFixed(2)}
          </div>

          <div className="isd-hud-chip" style={{ maxWidth: 300 }}>
            <span style={{ color: '#c4b5fd', fontWeight: 600 }}>{activeSurface.name}</span>
            <br />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#e2e8f0' }}>{activeSurface.formula}</span>
            <br />
            <span style={{ fontSize: 10, color: '#94a3b8' }}>Tap anywhere on the 3D surface to inspect tangent plane and normal.</span>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <aside className="isd-sidebar">
        {/* NPTEL Course Concept */}
        <div className="isd-concept-box">
          <strong>NPTEL AR/VR Concept:</strong> Demonstrates <em>Augmented Reality Camera Passthrough</em>, <em>Surface Normal Estimation</em>, and <em>Spatial Raycasting</em> used in AR engines (like ARCore / ARKit) for real-world surface tracking, occlusion, and collision geometry.
        </div>

        {/* Camera Passthrough Card */}
        <div className="isd-card">
          <h3 className="isd-card-title">
            <Camera size={16} /> AR Camera Passthrough
          </h3>
          <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>
            Project the mathematical surface into your physical room using your webcam or mobile camera.
          </p>
          <button
            className={isCameraActive ? 'isd-btn-outline' : 'isd-btn-primary'}
            onClick={toggleCamera}
          >
            {isCameraActive ? <CameraOff size={14} /> : <Camera size={14} />}
            {isCameraActive ? 'Disable AR Camera Feed' : 'Enable Live AR Camera'}
          </button>
          {cameraError && (
            <div style={{ color: '#fb7185', fontSize: 11 }}>{cameraError}</div>
          )}
        </div>

        {/* Mathematical Surface Selection */}
        <div className="isd-card">
          <h3 className="isd-card-title">
            <Layers size={16} /> Mathematical 3D Manifolds
          </h3>
          <div className="isd-slider-group">
            {SURFACES.map(s => (
              <button
                key={s.id}
                className={`isd-btn-pill ${selectedSurfaceId === s.id ? 'active' : ''}`}
                onClick={() => setSelectedSurfaceId(s.id)}
              >
                <div>{s.name}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', fontFamily: 'monospace' }}>{s.formula}</div>
              </button>
            ))}
          </div>

          <div className="isd-action-row" style={{ marginTop: 6 }}>
            <button
              className={`isd-btn-outline ${wireframe ? 'active' : ''}`}
              onClick={() => setWireframe(!wireframe)}
            >
              {wireframe ? 'Solid Surface' : 'Wireframe Mesh'}
            </button>
          </div>
        </div>

        {/* Real-time Calculus Inspector Card */}
        <div className="isd-card">
          <h3 className="isd-card-title">
            <Activity size={16} /> Real-Time Calculus Telemetry
          </h3>
          <div className="isd-slider-group">
            <div className="isd-slider-row">
              <div className="isd-slider-label">
                <span>Partial Derivative ∂z/∂x</span>
                <span>{derivatives.dx.toFixed(3)}</span>
              </div>
            </div>
            <div className="isd-slider-row">
              <div className="isd-slider-label">
                <span>Partial Derivative ∂z/∂y</span>
                <span>{derivatives.dy.toFixed(3)}</span>
              </div>
            </div>
            <div className="isd-slider-row">
              <div className="isd-slider-label">
                <span>Gradient Vector ∇f</span>
                <span>[{derivatives.dx.toFixed(2)}, {derivatives.dy.toFixed(2)}]</span>
              </div>
            </div>
            <div className="isd-slider-row">
              <div className="isd-slider-label">
                <span>Tangent Plane Equation</span>
                <span style={{ fontSize: 10 }}>z - z₀ = f_x(x - x₀) + f_y(y - y₀)</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
