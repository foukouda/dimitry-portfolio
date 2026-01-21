'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Helper function to get the correct path with basePath
const getAssetPath = (path: string): string => {
  // Check if we're on GitHub Pages by looking at the URL
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
  const basePath = isGitHubPages ? '/dimitry-portfolio' : '';
  return `${basePath}${path}`;
};

interface ThreeModelProps {
  modelType: 'cube' | 'triangle' | 'donut' | 'wing' | 'carousel' | 'projet2' | 'projet3';
  scaleMultiplier?: number;
}

export default function ThreeModel({ modelType, scaleMultiplier = 1 }: ThreeModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any existing canvas elements first
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create geometry based on type
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.Material | null = null;
    let loadedModel: THREE.Group | null = null;

    // Function to handle model loading
    const loadModel = async () => {
      // For projet3, use a fallback cube since the model was too large
      if (modelType === 'projet3') {
        createProceduralShape();
        return;
      }
      
      if (modelType === 'wing' || modelType === 'projet2') {
        // Load GLTF/GLB file for wing (projet 1), projet2 with dynamic import
        try {
          const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
          const loader = new GLTFLoader();
          
          // Try GLTF first (JSON format), then GLB (binary)
          const modelPath = modelType === 'wing'
            ? getAssetPath('/models/kagome.gltf')
            : getAssetPath('/models/projet2/projet2.gltf');
          
          loader.load(
            modelPath,
            (gltf) => {
              const model = gltf.scene;
              loadedModel = model;
              
              // Center and scale the model
              const box = new THREE.Box3().setFromObject(model);
              const center = box.getCenter(new THREE.Vector3());
              const size = box.getSize(new THREE.Vector3());
              
              // Scale to fit in view
              const maxDim = Math.max(size.x, size.y, size.z);
              const baseScale = 2 / maxDim;
              const finalScale = baseScale * scaleMultiplier;
              model.scale.setScalar(finalScale);
              
              // Center the model
              model.position.x = -center.x * finalScale;
              model.position.y = -center.y * finalScale;
              model.position.z = -center.z * finalScale;
              
              scene.add(model);
              meshRef.current = model as any;
            },
            (progress) => {
              if (progress.total > 0) {
                console.log('Loading model:', (progress.loaded / progress.total * 100).toFixed(2) + '%');
              }
            },
            (error) => {
              console.error('Error loading GLTF model:', error);
              // Try GLB format as fallback
              loader.load(
                '/models/projet1.glb',
                (gltf) => {
                  const model = gltf.scene;
                  loadedModel = model;
                  const box = new THREE.Box3().setFromObject(model);
                  const center = box.getCenter(new THREE.Vector3());
                  const size = box.getSize(new THREE.Vector3());
                  const maxDim = Math.max(size.x, size.y, size.z);
                  const baseScale = 2 / maxDim;
                  const finalScale = baseScale * scaleMultiplier;
                  model.scale.setScalar(finalScale);
                  model.position.x = -center.x * finalScale;
                  model.position.y = -center.y * finalScale;
                  model.position.z = -center.z * finalScale;
                  scene.add(model);
                  meshRef.current = model as any;
                },
                undefined,
                (glbError) => {
                  console.error('Error loading GLB model:', glbError);
                  createFallbackCube();
                }
              );
            }
          );
        } catch (error) {
          console.error('Error importing GLTFLoader:', error);
          createFallbackCube();
        }
      } else {
        // Keep procedural shapes for other types
        createProceduralShape();
      }
    };

    // Fallback cube creation
    const createFallbackCube = () => {
      geometry = new THREE.BoxGeometry(2 * scaleMultiplier, 2 * scaleMultiplier, 2 * scaleMultiplier);
      material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        shininess: 100,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshRef.current = mesh;
    };

    // Procedural shape creation for non-cube types
    const createProceduralShape = () => {
      material = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        shininess: 100,
      });

      switch (modelType) {
        case 'cube':
          geometry = new THREE.BoxGeometry(2 * scaleMultiplier, 2 * scaleMultiplier, 2 * scaleMultiplier);
          break;
        case 'triangle':
          geometry = new THREE.TetrahedronGeometry(1.5 * scaleMultiplier, 0);
          break;
        case 'carousel':
          // Create a cylinder for carousel (Kickstarter Carrousel)
          geometry = new THREE.CylinderGeometry(1.2 * scaleMultiplier, 1.2 * scaleMultiplier, 0.6 * scaleMultiplier, 32, 8);
          break;
        case 'donut':
          geometry = new THREE.TorusGeometry(1 * scaleMultiplier, 0.4 * scaleMultiplier, 16, 100);
          break;
        default:
          geometry = new THREE.BoxGeometry(2 * scaleMultiplier, 2 * scaleMultiplier, 2 * scaleMultiplier);
      }

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshRef.current = mesh;
    };

    // Load the appropriate model
    loadModel();

    // Mouse event handler
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const currentContainer = containerRef.current;
    currentContainer.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let isAnimating = true;
    const animate = () => {
      if (!isAnimating) return;
      
      animationIdRef.current = requestAnimationFrame(animate);

      if (meshRef.current) {
        meshRef.current.rotation.x += mouseRef.current.y * 0.01;
        meshRef.current.rotation.y += mouseRef.current.x * 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && cameraRef.current && rendererRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      isAnimating = false;
      
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      currentContainer.removeEventListener('mousemove', handleMouseMove);
      
      // Remove canvas from DOM
      if (currentContainer && renderer.domElement && renderer.domElement.parentElement === currentContainer) {
        currentContainer.removeChild(renderer.domElement);
      }
      
      // Dispose Three.js resources
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
      }
      if (loadedModel) {
        loadedModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
      renderer.dispose();
      
      // Clear scene
      scene.clear();
    };
  }, [modelType]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: '200px' }}
      className="bg-slate-100 dark:bg-slate-700 rounded-lg"
    />
  );
}
