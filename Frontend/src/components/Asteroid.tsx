import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const AsteroidVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    // Create a smooth but irregular asteroid shape
    const baseGeometry = new THREE.SphereGeometry(1, 64, 64);
    const geometry = new THREE.BufferGeometry();
    const positionAttribute = baseGeometry.getAttribute("position");
    const positions = new Float32Array(positionAttribute.count * 3);

    // Function to calculate the distance between two points
    const calculateDistance = (
      x1: number,
      y1: number,
      z1: number,
      x2: number,
      y2: number,
      z2: number
    ) => {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
    };

    // Define random positions for craters on the asteroid
    const craterCenters = [
      { x: 0.5, y: 0.5, z: 0.2 }, // Crater 1 position
      { x: -0.3, y: -0.6, z: 0.1 }, // Crater 2 position
      { x: -0.8, y: 0.2, z: 0.4 }, // Crater 3 position
    ];

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      // Random noise for general surface irregularities
      const noise =
        (Math.sin(x * 5 + y * 3) +
          Math.sin(y * 5 + z * 3) +
          Math.sin(z * 5 + x * 3)) /
        6;

      let deformation = 1 + noise * 0.2; // General surface deformation

      // Apply crater deformation for vertices near each crater center
      for (const crater of craterCenters) {
        const distance = calculateDistance(
          x,
          y,
          z,
          crater.x,
          crater.y,
          crater.z
        );
        const craterRadius = 0.3; // Radius of crater
        const craterDepth = 0.2; // Depth of crater

        // Only deform vertices within the crater radius
        if (distance < craterRadius) {
          const deformationFactor = 1 - distance / craterRadius; // Smooth deformation
          deformation -= deformationFactor * craterDepth;
        }
      }

      positions[i * 3] = x * deformation;
      positions[i * 3 + 1] = y * deformation;
      positions[i * 3 + 2] = z * deformation;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      color: 0x999999,
      roughness: 0.7,
      metalness: 0.3,
      transparent: false, // Ensure the material is not transparent
      opacity: 1, // Set full opacity
    });
    const asteroid = new THREE.Mesh(geometry, material);
    scene.add(asteroid);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    const backLight = new THREE.PointLight(0x404040, 0.5);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    camera.position.z = 2.5;

    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let autoRotate = true;

    const onMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      autoRotate = false;
    };

    const onMouseUp = () => {
      isMouseDown = false;
      autoRotate = true;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;

      asteroid.rotation.y += deltaX * 0.01;
      asteroid.rotation.x += deltaY * 0.01;

      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      if (autoRotate) {
        asteroid.rotation.x += 0.005;
        asteroid.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full flex items-center justify-center cursor-pointer"
      style={{ background: "#000000" }}
    />
  );
};

export default AsteroidVisualization;
