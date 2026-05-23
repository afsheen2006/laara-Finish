
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, Environment, Center } from "@react-three/drei";
import * as THREE from "three";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

function DroneModel({ mouse, isHero }) {
  const { scene } = useGLTF("/drone.glb");
  const droneRef = useRef(null);
  const smoothMouse = useRef([0, 0]);

  useFrame((state) => {
    if (!droneRef.current || !mouse.current) return;

    // Smoothly interpolate mouse coordinates to prevent sudden jumps
    smoothMouse.current[0] = THREE.MathUtils.lerp(smoothMouse.current[0], mouse.current[0], 0.05);
    smoothMouse.current[1] = THREE.MathUtils.lerp(smoothMouse.current[1], mouse.current[1], 0.05);

    // Auto-spin Y continuously, plus a subtle mouse-guided offset
    const autoRotationY = state.clock.elapsedTime * 0.15;
    const targetRotationY = autoRotationY + smoothMouse.current[0] * (Math.PI / 3);

    // Tilt X based on mouse Y position
    const targetRotationX = smoothMouse.current[1] * (Math.PI / 6);

    // Calculate dynamic base position and movement range
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const basePositionX = isHero && isDesktop ? 1.2 : 0;
    const basePositionY = isHero && isDesktop ? 0 : (isHero ? 0.3 : 0);

    // Target positions with bounds matching screen proportions
    const targetPositionX = basePositionX + smoothMouse.current[0] * (isHero ? 2.5 : 1.2);
    const targetPositionY = basePositionY + smoothMouse.current[1] * (isHero ? 1.5 : 0.8);

    // Smoothly interpolate rotation to target values
    droneRef.current.rotation.y = THREE.MathUtils.lerp(
      droneRef.current.rotation.y,
      targetRotationY,
      0.1
    );
    droneRef.current.rotation.x = THREE.MathUtils.lerp(
      droneRef.current.rotation.x,
      targetRotationX,
      0.1
    );

    // Smoothly interpolate translation/position
    droneRef.current.position.x = THREE.MathUtils.lerp(
      droneRef.current.position.x,
      targetPositionX,
      0.08
    );

    // Add float effect onto Y position
    const floatY = Math.sin(state.clock.elapsedTime) * 0.15;
    droneRef.current.position.y = THREE.MathUtils.lerp(
      droneRef.current.position.y,
      targetPositionY + floatY,
      0.08
    );
  });

  return (
    _jsx("group", {
      ref: droneRef,
      children: (
        _jsx(Center, {
          children: (
            _jsx("primitive", {
              object: scene,
              scale: 0.080 // Make the model extremely large and impactful
            })
          )
        })
      )
    })
  );
}

export function DroneViewer({ mouse, isHero = false }) {
  return (
    _jsx("div", {
      className: "w-full h-full", children: (
        _jsxs(Canvas, {
          shadows: true, dpr: [1, 2], children: [
            _jsx(PerspectiveCamera, { makeDefault: true, position: [0, 0, 5], fov: 50 }),
            _jsx("ambientLight", { intensity: 0.7 }),
            _jsx("directionalLight", { position: [5, 10, 5], intensity: 1.5, castShadow: true }),
            _jsx("spotLight", { position: [-5, 5, 5], intensity: 0.5 }),
            _jsx(Suspense, {
              fallback: null, children: (
                _jsxs(React.Fragment, {
                  children: [
                    _jsx(DroneModel, { mouse: mouse, isHero: isHero }),
                    _jsx(Environment, { preset: "city" })
                  ]
                })
              )
            })
          ]
        })
      )
    })
  );
}