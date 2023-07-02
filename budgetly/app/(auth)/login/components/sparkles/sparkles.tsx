import React from "react";
import { Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const SparklesComponent = () => {
  return (
    <Canvas>
      <Sparkles count={1000} scale={15} />
    </Canvas>
  );
};

export default SparklesComponent;
