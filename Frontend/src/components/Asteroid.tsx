import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

const AsteroidVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

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

    // Create smooth irregular asteroid geometry
    const createSmoothIrregularAsteroid = () => {
      const baseGeometry = new THREE.SphereGeometry(0.5, 64, 64);
      const noise2D = createNoise2D();
      const positions = baseGeometry.attributes.position;
      const vector = new THREE.Vector3();

      for (let i = 0; i < positions.count; i++) {
        vector.fromBufferAttribute(positions, i);
        const distance = vector.length();

        // Use multiple layers of noise for more natural irregularities
        let noiseValue = 0;
        noiseValue += noise2D(vector.x * 2, vector.y * 2) * 0.4;
        noiseValue += noise2D(vector.x * 4, vector.y * 4) * 0.2;
        noiseValue += noise2D(vector.x * 8, vector.y * 8) * 0.05;

        // Apply smoother deformation
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
          asteroid.rotation.x += 0.005;
          asteroid.rotation.y += 0.005;
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "400px", backgroundColor: "transparent" }}
    />
  );
};

export default AsteroidVisualization;
