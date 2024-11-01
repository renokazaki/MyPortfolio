import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "../components/Loader";
import Island from "../models/Island";
import { Sky } from "../models/Sky";
import { Bird } from "../models/Bird";
import { Plane } from "../models/Plane";
import { Html, Text } from "@react-three/drei";
import Info from "../components/Info";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  let [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43.4];
    let islandLotaion = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, islandLotaion];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -0.5, 0];
    } else {
      screenScale = [1, 5, 5];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition, islandLotaion] =
    adjustIslandForScreenSize();
  const [PlaneScale, PlanePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex item-center justify-center">
        {currentStage && <Info currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent  ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#ble1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Bird />
          <Plane
            position={PlanePosition}
            scale={PlaneScale}
            rotation={[0, 20, 0]}
          />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            scale={islandScale}
            rotation={islandLotaion}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
