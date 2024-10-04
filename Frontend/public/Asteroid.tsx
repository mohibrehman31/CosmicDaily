import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const AsteroidVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      `/asteroid-texture.jpg`,
      (texture) => {
        console.log("Texture loaded successfully");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 1);

        const material = new THREE.MeshStandardMaterial({
          map: texture,
          bumpMap: texture,
          bumpScale: 0.05,
          roughness: 0.8,
          metalness: 0.2,
        });

        const asteroid = new THREE.Mesh(geometry, material);
        scene.add(asteroid);

        // Lighting setup
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

        camera.position.z = 3;

        const animate = () => {
          requestAnimationFrame(animate);
          asteroid.rotation.x += 0.005;
          asteroid.rotation.y += 0.005;
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (err) => {
        console.error("Error loading texture:", err);
        setError(
          "Failed to load asteroid texture. Please check the file path and try again."
        );
      }
    );

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div ref={mountRef} />;
};

export default AsteroidVisualization;
