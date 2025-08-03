import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Interactive3DCubeProps {
  size?: number;
  faces?: Array<{
    id: number;
    name: string;
    modules: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
  }>;
  selectedFace?: number;
  onFaceClick?: (faceId: number) => void;
}

export const Interactive3DCube = ({ 
  size = 200, 
  faces = [], 
  selectedFace = 1, 
  onFaceClick 
}: Interactive3DCubeProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cubeRef = useRef<THREE.Group>();
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    // Фиксируем камеру на безопасном расстоянии и высоте
    camera.position.set(2, 1.5, 2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 2);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create cube group
    const cubeGroup = new THREE.Group();
    cubeRef.current = cubeGroup;
    scene.add(cubeGroup);

    // Create cube faces
    const cubeSize = 1;
    const geometry = new THREE.PlaneGeometry(cubeSize, cubeSize);
    
    // Face positions and rotations
    const faceConfigs = [
      { position: [0, 0, cubeSize/2], rotation: [0, 0, 0] }, // Front
      { position: [0, 0, -cubeSize/2], rotation: [0, Math.PI, 0] }, // Back
      { position: [cubeSize/2, 0, 0], rotation: [0, Math.PI/2, 0] }, // Right
      { position: [-cubeSize/2, 0, 0], rotation: [0, -Math.PI/2, 0] }, // Left
      { position: [0, cubeSize/2, 0], rotation: [-Math.PI/2, 0, 0] }, // Top
      { position: [0, -cubeSize/2, 0], rotation: [Math.PI/2, 0, 0] }, // Bottom
    ];

    faceConfigs.forEach((config, index) => {
      const faceIndex = index + 1;
      const face = faces.find(f => f.id === faceIndex);
      
      // Create face material with gradient colors
      const gradientColors = [
        '#FFBB57', '#FDB43C', '#537FF0', '#2177E6', '#F18C64', '#1E2A69'
      ];
      
      const material = new THREE.MeshLambertMaterial({
        color: gradientColors[index],
        transparent: true,
        opacity: selectedFace === faceIndex ? 1.0 : 0.8
      });

      const faceMesh = new THREE.Mesh(geometry, material);
      faceMesh.position.set(config.position[0], config.position[1], config.position[2]);
      faceMesh.rotation.set(config.rotation[0], config.rotation[1], config.rotation[2]);
      faceMesh.userData = { faceId: faceIndex };

      // Add border
      const borderGeometry = new THREE.EdgesGeometry(geometry);
      const borderMaterial = new THREE.LineBasicMaterial({ 
        color: selectedFace === faceIndex ? 0x2177E6 : 0x1E2A69,
        linewidth: selectedFace === faceIndex ? 3 : 1
      });
      const border = new THREE.LineSegments(borderGeometry, borderMaterial);
      border.position.copy(faceMesh.position);
      border.rotation.copy(faceMesh.rotation);

      cubeGroup.add(faceMesh);
      cubeGroup.add(border);

      // Add text/icons if face has modules
      if (face && face.modules.length > 0) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = 256;
          canvas.height = 256;
          
          context.fillStyle = 'rgba(255, 255, 255, 0.9)';
          context.fillRect(0, 0, 256, 256);
          
          context.fillStyle = '#1E2A69';
          context.font = '24px Arial';
          context.textAlign = 'center';
          context.fillText(face.name, 128, 40);
          
          // Draw module icons in grid
          face.modules.slice(0, 4).forEach((module, modIndex) => {
            const x = (modIndex % 2) * 128 + 64;
            const y = Math.floor(modIndex / 2) * 80 + 120;
            context.font = '40px Arial';
            context.fillText(module.icon, x, y);
            context.font = '12px Arial';
            context.fillText(module.name, x, y + 25);
          });
          
          const texture = new THREE.CanvasTexture(canvas);
          const textMaterial = new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true 
          });
          
          const textMesh = new THREE.Mesh(geometry, textMaterial);
          textMesh.position.set(
            config.position[0] + config.rotation[1] * 0.01,
            config.position[1] + config.rotation[0] * 0.01,
            config.position[2] + 0.01
          );
          textMesh.rotation.set(config.rotation[0], config.rotation[1], config.rotation[2]);
          
          cubeGroup.add(textMesh);
        }
      }
    });

    // Mouse/touch interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    const onMouseDown = (event: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      if (!isDragging || !cubeRef.current) return;
      
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
      
      const deltaMove = {
        x: clientX - previousMousePosition.x,
        y: clientY - previousMousePosition.y
      };

      // Разрешаем только горизонтальное вращение (влево-вправо)
      cubeRef.current.rotation.y += deltaMove.x * 0.01;
      
      // Запрещаем вертикальное вращение (вверх-вниз)
      // cubeRef.current.rotation.x += deltaMove.y * 0.01; // отключено

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = (event: MouseEvent) => {
      if (!onFaceClick) return;
      
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(cubeGroup.children);
      if (intersects.length > 0) {
        const faceId = intersects[0].object.userData.faceId;
        if (faceId) {
          onFaceClick(faceId);
        }
      }
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('click', onClick);
    
    // Touch events
    renderer.domElement.addEventListener('touchstart', onMouseDown);
    renderer.domElement.addEventListener('touchmove', onMouseMove);
    renderer.domElement.addEventListener('touchend', onMouseUp);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Медленное автоматическое вращение только когда не перетаскиваем
      if (!isDragging && cubeRef.current) {
        cubeRef.current.rotation.y += 0.002; // Уменьшили скорость
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('touchstart', onMouseDown);
      renderer.domElement.removeEventListener('touchmove', onMouseMove);
      renderer.domElement.removeEventListener('touchend', onMouseUp);
      
      // Use the currentMount variable captured at the beginning of the effect
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, [size, faces, selectedFace, onFaceClick]);

  return (
    <div 
      ref={mountRef} 
      className="interactive-3d-cube"
      style={{ 
        width: size, 
        height: size, 
        cursor: 'grab',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
      onMouseDown={() => {
        if (mountRef.current) {
          mountRef.current.style.cursor = 'grabbing';
        }
      }}
      onMouseUp={() => {
        if (mountRef.current) {
          mountRef.current.style.cursor = 'grab';
        }
      }}
      onMouseLeave={() => {
        if (mountRef.current) {
          mountRef.current.style.cursor = 'grab';
        }
      }}
    />
  );
};