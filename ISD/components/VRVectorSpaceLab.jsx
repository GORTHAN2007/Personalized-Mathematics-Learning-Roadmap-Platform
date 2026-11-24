import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Glasses, 
  Rotate3d, 
  RefreshCw, 
  Sliders, 
  Info, 
  Eye, 
  Box, 
  Play, 
  Pause 
} from 'lucide-react';

export default function VRVectorSpaceLab() {
  const mountRef = useRef(null);

  // Lab State
  const [vector, setVector] = useState({ x: 1.5, y: 1.2, z: 1.0 });
  const [rotationAngle, setRotationAngle] = useState(30); // in degrees
  const [scaleFactor, setScaleFactor] = useState(1.2);
  const [shearFactor, setShearFactor] = useState(0.5);
  const [activePreset, setActivePreset] = useState('rotation');
  
  // VR & Camera State
  const [isStereoVR, setIsStereoVR] = useState(false);
  const [ipd, setIpd] = useState(0.064); // Interpupillary distance in meters
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // References to keep Three.js instances
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Transformation Objects References
  const objectsRef = useRef({
    originalVectorArrow: null,
    transformedVectorArrow: null,
    cubeOriginal: null,
    cubeTransformed: null,
    basisArrows: [],
    transformedBasisArrows: []
  });

  // Calculate Transformation Matrix M (3x3)
  const calculateMatrix = () => {
    const rad = (rotationAngle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    let m = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];

    if (activePreset === 'identity') {
      m = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
    } else if (activePreset === 'rotation') {
      // Rotation about Y-axis
      m = [
        [cos, 0, sin],
        [0, 1, 0],
        [-sin, 0, cos]
      ];
    } else if (activePreset === 'scale') {
      // Uniform/Non-uniform scale
      m = [
        [scaleFactor, 0, 0],
        [0, scaleFactor, 0],
        [0, 0, 1]
      ];
    } else if (activePreset === 'shear') {
      // Shear in X along Y
      m = [
        [1, shearFactor, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
    } else if (activePreset === 'combined') {
      // Scale + Rotation + Shear combined
      m = [
        [cos * scaleFactor, shearFactor, sin * scaleFactor],
        [0, scaleFactor, 0],
        [-sin * scaleFactor, 0, cos * scaleFactor]
      ];
    }

    return m;
  };

  const matrix = calculateMatrix();

  // Transformed vector v' = M * v
  const transformedV = {
    x: matrix[0][0] * vector.x + matrix[0][1] * vector.y + matrix[0][2] * vector.z,
    y: matrix[1][0] * vector.x + matrix[1][1] * vector.y + matrix[1][2] * vector.z,
    z: matrix[2][0] * vector.x + matrix[2][1] * vector.y + matrix[2][2] * vector.z
  };

  // Determinant calculation (Volume scaling factor)
  const detM = (
    matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
    matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
    matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
  ).toFixed(3);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090b14);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 4, 6);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 20;
    controls.minDistance = 2;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xa78bfa, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 6. Grid & Coordinate Axes
    const grid = new THREE.GridHelper(10, 20, 0x6366f1, 0x1e293b);
    grid.position.y = 0;
    scene.add(grid);

    // Custom Axes (X: Red, Y: Green, Z: Blue)
    const axesGroup = new THREE.Group();
    const axisLen = 4;
    const origin = new THREE.Vector3(0, 0, 0);

    const xArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, axisLen, 0xef4444, 0.3, 0.15);
    const yArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, axisLen, 0x22c55e, 0.3, 0.15);
    const zArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, axisLen, 0x3b82f6, 0.3, 0.15);
    axesGroup.add(xArrow, yArrow, zArrow);
    scene.add(axesGroup);

    // 7. Unit Cube to illustrate transformation of space volume
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    const boxEdges = new THREE.EdgesGeometry(boxGeo);
    const boxOriginal = new THREE.LineSegments(
      boxEdges,
      new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.45 })
    );
    boxOriginal.position.set(0.5, 0.5, 0.5);
    scene.add(boxOriginal);
    objectsRef.current.cubeOriginal = boxOriginal;

    // Transformed cube wireframe
    const boxTransformed = new THREE.LineSegments(
      boxEdges.clone(),
      new THREE.LineDashedMaterial({ color: 0xc084fc, dashSize: 0.1, gapSize: 0.05, linewidth: 2 })
    );
    boxTransformed.computeLineDistances();
    boxTransformed.position.set(0.5, 0.5, 0.5);
    scene.add(boxTransformed);
    objectsRef.current.cubeTransformed = boxTransformed;

    // 8. Vector Arrows (Original v and Transformed v')
    const vOrigin = new THREE.Vector3(0, 0, 0);
    const vDir = new THREE.Vector3(vector.x, vector.y, vector.z);
    const vLen = vDir.length() || 1;
    vDir.normalize();

    const origArrow = new THREE.ArrowHelper(vDir, vOrigin, vLen, 0x38bdf8, 0.35, 0.18);
    scene.add(origArrow);
    objectsRef.current.originalVectorArrow = origArrow;

    const transArrow = new THREE.ArrowHelper(vDir, vOrigin, vLen, 0xf59e0b, 0.4, 0.2);
    scene.add(transArrow);
    objectsRef.current.transformedVectorArrow = transArrow;

    // Animation Loop (Supporting Standard Mono View & Stereoscopic Mobile VR View)
    let angle = 0;
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (isAutoRotating) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.0;
      } else {
        controls.autoRotate = false;
      }
      controls.update();

      if (!isStereoVR) {
        // Standard Monoscopic Render
        renderer.setScissorTest(false);
        renderer.setViewport(0, 0, width, height);
        renderer.render(scene, camera);
      } else {
        // Stereoscopic Side-by-Side (SBS) Dual Eye Render for Mobile VR Headset
        const halfWidth = width / 2;
        renderer.setScissorTest(true);

        // Left Eye
        renderer.setScissor(0, 0, halfWidth, height);
        renderer.setViewport(0, 0, halfWidth, height);
        camera.aspect = halfWidth / height;
        camera.updateProjectionMatrix();

        // Eye Separation Offset (IPD)
        const eyeOffset = ipd * 0.5;
        camera.translateX(-eyeOffset);
        renderer.render(scene, camera);
        camera.translateX(eyeOffset); // revert

        // Right Eye
        renderer.setScissor(halfWidth, 0, halfWidth, height);
        renderer.setViewport(halfWidth, 0, halfWidth, height);
        camera.translateX(eyeOffset);
        renderer.render(scene, camera);
        camera.translateX(-eyeOffset); // revert
      }
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = isStereoVR ? (w / 2) / h : w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      controls.dispose();
      renderer.dispose();
    };
  }, [isStereoVR, ipd, isAutoRotating]);

  // Update Vector Arrows and Transformations in real-time
  useEffect(() => {
    if (!objectsRef.current.originalVectorArrow || !objectsRef.current.transformedVectorArrow) return;

    // 1. Update Original Vector Arrow
    const origDir = new THREE.Vector3(vector.x, vector.y, vector.z);
    const origLen = Math.max(origDir.length(), 0.001);
    origDir.normalize();
    objectsRef.current.originalVectorArrow.setDirection(origDir);
    objectsRef.current.originalVectorArrow.setLength(origLen, 0.35, 0.18);

    // 2. Update Transformed Vector Arrow
    const transDir = new THREE.Vector3(transformedV.x, transformedV.y, transformedV.z);
    const transLen = Math.max(transDir.length(), 0.001);
    transDir.normalize();
    objectsRef.current.transformedVectorArrow.setDirection(transDir);
    objectsRef.current.transformedVectorArrow.setLength(transLen, 0.4, 0.2);

    // 3. Update Transformed Cube Matrix
    if (objectsRef.current.cubeTransformed) {
      const cube = objectsRef.current.cubeTransformed;
      const m4 = new THREE.Matrix4();
      m4.set(
        matrix[0][0], matrix[0][1], matrix[0][2], 0,
        matrix[1][0], matrix[1][1], matrix[1][2], 0,
        matrix[2][0], matrix[2][1], matrix[2][2], 0,
        0, 0, 0, 1
      );
      cube.matrixAutoUpdate = false;
      cube.matrix.copy(m4);
    }
  }, [vector, rotationAngle, scaleFactor, shearFactor, activePreset]);

  // Reset Camera Position
  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(5, 4, 6);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className="isd-body">
      {/* 3D Canvas Viewport */}
      <div className="isd-viewport-wrapper">
        <div ref={mountRef} className="isd-canvas-container" />

        {/* Stereoscopic Center Divider & Reticles when in Cardboard VR Mode */}
        {isStereoVR && (
          <>
            <div className="isd-stereo-divider" />
            <div className="isd-stereo-reticle left" />
            <div className="isd-stereo-reticle right" />
          </>
        )}

        {/* In-Canvas Telemetry HUD */}
        <div className="isd-viewport-hud">
          <div className="isd-hud-chip">
            <span style={{ color: '#38bdf8' }}>● Vector v:</span> [{vector.x.toFixed(1)}, {vector.y.toFixed(1)}, {vector.z.toFixed(1)}]
            <br />
            <span style={{ color: '#f59e0b' }}>● Transformed v':</span> [{transformedV.x.toFixed(2)}, {transformedV.y.toFixed(2)}, {transformedV.z.toFixed(2)}]
          </div>

          <div className="isd-hud-matrix">
            <div style={{ color: '#c4b5fd', fontWeight: 600, marginBottom: 2 }}>
              Matrix M [det(M) = {detM}]
            </div>
            <div className="isd-matrix-grid">
              <span>{matrix[0][0].toFixed(2)}</span>
              <span>{matrix[0][1].toFixed(2)}</span>
              <span>{matrix[0][2].toFixed(2)}</span>
              <span>{matrix[1][0].toFixed(2)}</span>
              <span>{matrix[1][1].toFixed(2)}</span>
              <span>{matrix[1][2].toFixed(2)}</span>
              <span>{matrix[2][0].toFixed(2)}</span>
              <span>{matrix[2][1].toFixed(2)}</span>
              <span>{matrix[2][2].toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Sidebar */}
      <aside className="isd-sidebar">
        {/* NPTEL Course Alignment Concept */}
        <div className="isd-concept-box">
          <strong>NPTEL Mobile VR Concept:</strong> Demonstrates <em>Spatial Coordinate Transformations</em>, <em>Rigid Body Rotations</em>, and <em>Stereoscopic Parallax (IPD)</em> used in VR head-mounted displays and computer graphics engines.
        </div>

        {/* VR View Mode Card */}
        <div className="isd-card">
          <h3 className="isd-card-title">
            <Glasses size={16} /> VR Headset & View Mode
          </h3>
          <div className="isd-action-row">
            <button
              className={`isd-btn-pill ${!isStereoVR ? 'active' : ''}`}
              onClick={() => setIsStereoVR(false)}
            >
              Standard 3D Orbit
            </button>
            <button
              className={`isd-btn-pill ${isStereoVR ? 'active' : ''}`}
              onClick={() => setIsStereoVR(true)}
            >
              <Glasses size={13} style={{ display: 'inline', marginRight: 4 }} />
              Cardboard VR (SBS)
            </button>
          </div>

          {isStereoVR && (
            <div className="isd-slider-row" style={{ marginTop: 6 }}>
              <div className="isd-slider-label">
                <span>Interpupillary Distance (IPD)</span>
                <span>{(ipd * 1000).toFixed(0)} mm</span>
              </div>
              <input
                type="range"
                className="isd-range-input"
                min="0.050"
                max="0.075"
                step="0.001"
                value={ipd}
                onChange={(e) => setIpd(parseFloat(e.target.value))}
              />
            </div>
          )}

          <div className="isd-action-row">
            <button
              className="isd-btn-outline"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              title="Toggle automatic orbit rotation"
            >
              {isAutoRotating ? <Pause size={13} /> : <Play size={13} />}
              {isAutoRotating ? 'Pause Orbit' : 'Auto Rotate'}
            </button>
            <button
              className="isd-btn-outline"
              onClick={handleResetCamera}
              title="Reset view to origin"
            >
              <RefreshCw size={13} /> Reset View
            </button>
          </div>
        </div>

        {/* Matrix Transformation Presets */}
        <div className="isd-card">
          <h3 className="isd-card-title">
            <Rotate3d size={16} /> Transformation Presets
          </h3>
          <div className="isd-preset-grid">
            {[
              { id: 'rotation', label: '3D Rotation' },
              { id: 'scale', label: 'Scaling' },
              { id: 'shear', label: 'Shear Space' },
              { id: 'combined', label: 'Combined' },
              { id: 'identity', label: 'Identity Matrix' }
            ].map(preset => (
              <button
                key={preset.id}
                className={`isd-btn-pill ${activePreset === preset.id ? 'active' : ''}`}
                onClick={() => setActivePreset(preset.id)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Dynamic Sliders based on active preset */}
          <div className="isd-slider-group" style={{ marginTop: 8 }}>
            {(activePreset === 'rotation' || activePreset === 'combined') && (
              <div className="isd-slider-row">
                <div className="isd-slider-label">
                  <span>Yaw Angle (θ)</span>
                  <span>{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  className="isd-range-input"
                  min="-180"
                  max="180"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(parseInt(e.target.value))}
                />
              </div>
            )}

            {(activePreset === 'scale' || activePreset === 'combined') && (
              <div className="isd-slider-row">
                <div className="isd-slider-label">
                  <span>Scale Factor (s)</span>
                  <span>{scaleFactor.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  className="isd-range-input"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                />
              </div>
            )}

            {(activePreset === 'shear' || activePreset === 'combined') && (
              <div className="isd-slider-row">
                <div className="isd-slider-label">
                  <span>Shear Factor (k)</span>
                  <span>{shearFactor.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  className="isd-range-input"
                  min="-1.5"
                  max="1.5"
                  step="0.05"
                  value={shearFactor}
                  onChange={(e) => setShearFactor(parseFloat(e.target.value))}
                />
              </div>
            )}
          </div>
        </div>

        {/* Input Vector Coordinates */}
        <div className="isd-card">
          <h3 className="isd-card-title">
            <Sliders size={16} /> Input Vector Coordinates
          </h3>
          <div className="isd-slider-group">
            {['x', 'y', 'z'].map(axis => (
              <div key={axis} className="isd-slider-row">
                <div className="isd-slider-label">
                  <span>Component {axis.toUpperCase()}</span>
                  <span>{vector[axis].toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  className="isd-range-input"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={vector[axis]}
                  onChange={(e) => setVector({ ...vector, [axis]: parseFloat(e.target.value) })}
                />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
