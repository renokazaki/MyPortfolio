import { Html } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import Models from "./Models";
import { Physics } from "@react-three/rapier";
import Ground from "./Ground";

const Objects = () => {
  const [hamburgers, setHamburgers] = useState([]); // 複数のハンバーガーを管理

  const [isFalling, setIsFalling] = useState(false); // 落下状態を管理する
  const [isSleeping, setIsSleeping] = useState(false); // 落下状態を管理する

  const initialPosition = [0, 5, 0];
  const [targetModels, setTargetModels] = useState("");

  // ユニークなIDを生成する関数
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // ハンバーガーを追加する関数
  const addHamburger = () => {
    const newHamburger = {
      id: generateUniqueId(), // ユニークなIDを生成
      position: initialPosition, // 初期位置
      isFalling: false, // 落下状態
    };
    setTargetModels(newHamburger.id);
    setHamburgers((prevHamburgers) => [...prevHamburgers, newHamburger]);
  };

  useEffect(() => {
    addHamburger(); // 初回レンダリング時にハンバーガーを追加
  }, []);

  const dropHamburger = (id) => {
    setHamburgers((prevHamburgers) =>
      prevHamburgers.map((hamburger) =>
        hamburger.id === id
          ? { ...hamburger, isFalling: true } // 対象のハンバーガーだけ isFalling を true にする
          : hamburger
      )
    );
  };

  // Move Left / Right ボタンの処理を修正
  const moveHamburgerLeft = () => {
    if (hamburgers.length > 0) {
      const latestHamburger = hamburgers[hamburgers.length - 1]; // 最後に追加されたハンバーガー
      updateHamburgerPosition(latestHamburger.id, [
        latestHamburger.position[0] - 1,
        latestHamburger.position[1],
        latestHamburger.position[2],
      ]);
    }
  };

  const moveHamburgerRight = () => {
    if (hamburgers.length > 0) {
      const latestHamburger = hamburgers[hamburgers.length - 1];
      updateHamburgerPosition(latestHamburger.id, [
        latestHamburger.position[0] + 1,
        latestHamburger.position[1],
        latestHamburger.position[2],
      ]);
    }
  };

  // 新しいハンバーガーの位置を更新する関数
  const updateHamburgerPosition = (id, newPosition) => {
    setHamburgers((prevHamburgers) =>
      prevHamburgers.map((hamburger) =>
        hamburger.id === id
          ? { ...hamburger, position: newPosition }
          : hamburger
      )
    );
  };

  return (
    <>
      <Physics debug>
        <Models
          hamburgers={hamburgers} // 複数のハンバーガーをModelsに渡す
          updateHamburgerPosition={updateHamburgerPosition} // 位置更新用関数を渡す
          isFalling={isFalling}
          setIsSleeping={setIsSleeping}
          setIsFalling={setIsFalling}
          addHamburger={addHamburger}
        />
        <Ground />
      </Physics>
      <Html>
        {/* コントロールボタン */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={moveHamburgerLeft}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Move Left
          </button>
          <button
            onClick={() => dropHamburger(targetModels)} // 対象のハンバーガーIDを渡す
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Drop
          </button>
          <button
            onClick={moveHamburgerRight}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Move Right
          </button>
          <button
            onClick={addHamburger}
            className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Add
          </button>
        </div>
      </Html>
    </>
  );
};

export default Objects;
