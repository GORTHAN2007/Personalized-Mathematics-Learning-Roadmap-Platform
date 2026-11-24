# ISD — Mobile Virtual Reality & Artificial Intelligence Laboratory

> **Course Alignment:** NPTEL / SWAYAM — *Mobile Virtual Reality and Artificial Intelligence*  
> **Parent Platform:** Major Project — *Personalized Mathematics Learning Roadmap Platform (MathPath AI)*  
> **Directory Location:** `ISD/` (Root Level)

---

## 1. Overview & Objectives

The **ISD (Interactive Systems & Demonstrations)** module is a dedicated, self-contained extension designed to integrate foundational concepts from the NPTEL/SWAYAM course **Mobile Virtual Reality and Artificial Intelligence** directly into our **Major Project** (Personalized Mathematics Learning Roadmap Platform).

In modern computer science, mathematics—specifically **Linear Algebra** and **Multivariable Calculus**—forms the backbone of 3D computer graphics, virtual reality engines, spatial tracking (6DoF / 3DoF), and augmented reality perception. This module bridges mathematical theory with immersive AR/VR technologies.

---

## 2. Implemented Features (AR / VR)

### Feature 1: Mobile VR 3D Vector Space & Linear Transformation Lab
*Located in:* `ISD/components/VRVectorSpaceLab.jsx`

* **NPTEL Mobile VR Concepts Covered:**
  1. **Stereoscopic 3D & Dual-Eye Rendering (SBS):** Implements dual-viewport rendering with adjustable **Interpupillary Distance (IPD)** (50mm–75mm) simulating binocular disparity. Designed for smartphone insertion into Google Cardboard or mobile VR headsets.
  2. **Spatial Coordinate Systems & Rigid Body Transformations:** Visualizes Cartesian 3D basis vectors ($\mathbf{\hat{i}}, \mathbf{\hat{j}}, \mathbf{\hat{k}}$) and arbitrary vectors $\mathbf{v} \in \mathbb{R}^3$.
  3. **3D Linear Transformation Matrix ($M \cdot \mathbf{v}$):** Real-time transformation of space and vector coordinates under 3D Euler rotation ($R_y$), non-uniform scaling ($S$), and spatial shearing ($H$).
  4. **Volume Scaling via Determinant:** A unit cube lattice undergoes deformation, demonstrating how $\det(M)$ dictates geometric volume scaling and spatial chirality in 3D VR engines.
  5. **Virtual Camera Tracking:** 3DoF/6DoF orbital navigation, pitch/yaw controls, and camera reset mechanisms.

### Feature 2: Augmented Reality (AR) 3D Surface & Gradient Field Inspector
*Located in:* `ISD/components/ARSurfaceExplorer.jsx`

* **NPTEL Mobile AR/VR Concepts Covered:**
  1. **AR Video Passthrough / HUD Overlay:** Utilizes WebRTC device camera access (`navigator.mediaDevices.getUserMedia`) to project mathematical 3D structures onto the user's real-world physical environment (with automatic fallback to a virtual AR hologram grid).
  2. **Parametric 3D Manifolds:** Real-time generation of multivariable calculus surfaces:
     - **Hyperbolic Paraboloid (Saddle Point):** $z = \frac{x^2 - y^2}{4}$
     - **Elliptic Paraboloid:** $z = \frac{x^2 + y^2}{4}$
     - **Sinusoidal Wavepacket:** $z = \sin(\sqrt{x^2 + y^2})$
     - **Monkey Saddle:** $z = \frac{x^3 - 3xy^2}{6}$
  3. **Spatial Raycasting & Collision Detection:** User taps/clicks on the augmented surface in 3D space, triggering a spatial raycast intersection.
  4. **Dynamic Normal & Tangent Plane Estimation:** The system analytically evaluates partial derivatives $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$ at point $P(x_0, y_0, z_0)$, projecting:
     - The **Gradient Vector** $\nabla f = [f_x, f_y]$
     - The **3D Normal Vector** $\mathbf{n} = \frac{[-f_x, 1, -f_y]}{\sqrt{f_x^2 + f_y^2 + 1}}$
     - The localized **Tangent Plane** $z - z_0 = f_x(x - x_0) + f_y(y - y_0)$ oriented tangentially to the manifold.

---

## 3. Directory Structure

```
ISD/
├── README.md                      # Complete documentation & NPTEL alignment (this file)
├── isd.css                        # Scoped dark-mode styles for the AR/VR components
├── index.js                       # Public JavaScript export barrel
├── components/
│   ├── ARVRModal.jsx              # Integrated modal dialogue linking Feature 1 and Feature 2
│   ├── VRVectorSpaceLab.jsx       # Feature 1: Mobile VR 3D Vector & Transformation Simulator
│   └── ARSurfaceExplorer.jsx      # Feature 2: Augmented Reality 3D Surface & Gradient Inspector
└── standalone/
    └── index.html                 # Self-contained zero-dependency browser demonstration
```

---

## 4. Integration with Major Project

The ISD module connects with the frontend via the Vite path alias `@isd` configured in `frontend/vite.config.js`:

1. **Quick-Launch Banner in Simulations:** In the *Visual Simulations* section (`SimulationsPanel.jsx`), users can launch the full AR/VR lab via a dedicated action card.
2. **Global Navigation Icon:** A dedicated headset icon is accessible in the `VerticalIconBar.jsx`.
3. **No Project Disruption:** All ISD logic, components, and styles remain localized inside the `ISD/` folder, ensuring zero regression or restructuring of existing project features.

---

## 5. How to Run & Demonstrate

### Option A: Running Inside the Major Project (Recommended)

1. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open `http://localhost:5173` in your browser.
3. Access the **ISD AR/VR Lab**:
   - Click the **VR Headset icon** on the left vertical sidebar, OR
   - Open **Visual Simulations** and click **"Launch ISD Mobile AR/VR Lab"**.
4. To test **Mobile VR mode**: Click **"Cardboard VR (SBS)"** and adjust IPD.
5. To test **Augmented Reality mode**: Switch to the **AR 3D Surface Explorer** tab and click **"Enable Live AR Camera"**.

---

### Option B: Running the Standalone Demonstration (Zero-Install)

If you wish to demonstrate the AR/VR features in isolation without starting the full React app:

```bash
# macOS shortcut:
open ISD/standalone/index.html

# OR run with Python's built-in web server:
python3 -m http.server 8080 --directory ISD/standalone
# Then open http://localhost:8080
```

---

## 6. Summary of Academic Value (For Examination / Viva)

| Parameter | Course Syllabus Concept | Practical Implementation in ISD |
|---|---|---|
| **Stereoscopic Vision** | Interpupillary Distance (IPD) & Binocular Parallax | Dual-viewport Scissor render with left/right eye camera offset for mobile VR headsets. |
| **Transformations** | 3D Rigid Body & Affine Transformations | Real-time $3 \times 3$ matrix operations ($R_y, S, H$), determinant computation, and lattice distortion. |
| **Spatial Tracking** | Raycasting & Collision Detection | Raycaster projection on parametric 3D manifolds with normal vector $\mathbf{n}$ estimation. |
| **Augmented Reality** | Video Passthrough & Scene Occlusion | Live camera backdrop via WebRTC stream integrated with WebGL rendering. |
