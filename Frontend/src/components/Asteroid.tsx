import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

const AsteroidVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const asteroidRef = useRef<THREE.Mesh | null>(null);
  const mouseDownRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationSpeedRef = useRef({ x: 0.003, y: 0.003 });
  const lastUpdateTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const createSmoothIrregularAsteroid = () => {
      const baseGeometry = new THREE.SphereGeometry(0.5, 64, 64);
      const noise2D = createNoise2D();
      const positions = baseGeometry.attributes.position;
      const vector = new THREE.Vector3();

      for (let i = 0; i < positions.count; i++) {
        vector.fromBufferAttribute(positions, i);
        const distance = vector.length();

        let noiseValue = 0;
        noiseValue += noise2D(vector.x * 2, vector.y * 2) * 0.4;
        noiseValue += noise2D(vector.x * 4, vector.y * 4) * 0.2;
        noiseValue += noise2D(vector.x * 8, vector.y * 8) * 0.05;

        vector.normalize().multiplyScalar(distance * (1 + noiseValue * 0.2));
        positions.setXYZ(i, vector.x, vector.y, vector.z);
      }

      baseGeometry.computeVertexNormals();
      return baseGeometry;
    };

    const geometry = createSmoothIrregularAsteroid();
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      "/asteroid-texture.jpg",
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 1);

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          bumpMap: texture,
          bumpScale: 0.03,
          roughness: 0.7,
          metalness: 0.2,
        });

        const asteroid = new THREE.Mesh(geometry, material);
        asteroidRef.current = asteroid;
        scene.add(asteroid);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 3, 5);
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0x8888ff, 0.5);
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xffffaa, 0.3);
        rimLight.position.set(0, -5, 0);
        scene.add(rimLight);

        camera.position.z = 2;

        const animate = () => {
          requestAnimationFrame(animate);

          const currentTime = Date.now();
          const deltaTime = (currentTime - lastUpdateTimeRef.current) / 1000;
          lastUpdateTimeRef.current = currentTime;

          if (!mouseDownRef.current && asteroidRef.current) {
            asteroidRef.current.rotation.x +=
              rotationSpeedRef.current.x * deltaTime * 60;
            asteroidRef.current.rotation.y +=
              rotationSpeedRef.current.y * deltaTime * 60;

            rotationSpeedRef.current.x *= 0.995;
            rotationSpeedRef.current.y *= 0.995;

            const minSpeed = 0.003;
            if (Math.abs(rotationSpeedRef.current.x) < minSpeed)
              rotationSpeedRef.current.x =
                minSpeed * Math.sign(rotationSpeedRef.current.x);
            if (Math.abs(rotationSpeedRef.current.y) < minSpeed)
              rotationSpeedRef.current.y =
                minSpeed * Math.sign(rotationSpeedRef.current.y);
          }

          renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
          const width = mountRef.current?.clientWidth || window.innerWidth;
          const height = mountRef.current?.clientHeight || window.innerHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      },
      undefined,
      (err) => {
        console.error("Error loading texture:", err);
        setError(
          "Failed to load asteroid texture. Please check the file path and try again."
        );
      }
    );

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      mouseDownRef.current = true;
      previousMousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      mouseDownRef.current = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (mouseDownRef.current && asteroidRef.current) {
        const deltaX = event.clientX - previousMousePositionRef.current.x;
        const deltaY = event.clientY - previousMousePositionRef.current.y;

        asteroidRef.current.rotation.y += deltaX * 0.02; // Increased sensitivity
        asteroidRef.current.rotation.x += deltaY * 0.02; // Increased sensitivity

        // Update rotation speed based on mouse movement (increased)
        rotationSpeedRef.current.x = deltaY * 0.0004;
        rotationSpeedRef.current.y = deltaX * 0.0004;

        previousMousePositionRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="cursor-grab active:cursor-grabbing"
      ref={mountRef}
      style={{ width: "100%", height: "400px", backgroundColor: "transparent" }}
    />
  );
};

export default AsteroidVisualization;
