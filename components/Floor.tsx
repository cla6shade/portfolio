'use client';

import { useTexture } from '@react-three/drei';

export default function Floor() {
  // 여러 텍스쳐 맵을 한번에 로드
  // useTexture는 객체로 전달하면 각 텍스쳐를 키-값 쌍으로 반환
  const { diffuse, normal, roughness } = useTexture({
    diffuse: '/floor/wood_shutter_diff_1k.jpg',      // 기본 색상과 나무 무늬
    normal: '/floor/wood_shutter_nor_gl_1k.jpg',        // 나무 결의 입체감 (Normal GL 포맷)
    roughness: '/floor/wood_shutter_rough_1k.jpg',  // 표면 거칠기 (밝을수록 거칠고, 어두울수록 반짝임)
  });

  const [width, height] = [80, 40];  // 바닥 크기를 더 크게 확장
  const repeatScale = 5;
  const [hRepeat, vRepeat] = [width / repeatScale, height / repeatScale];

  [diffuse, normal, roughness].forEach((texture) => {
    texture.wrapS = texture.wrapT = 1000; // RepeatWrapping (Three.js 상수값)
    texture.repeat.set(hRepeat, vRepeat); // 텍스쳐를 5x5로 반복
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={diffuse}
        normalMap={normal}
        roughnessMap={roughness}
        metalness={0.1}
      />
    </mesh>
  );
}
