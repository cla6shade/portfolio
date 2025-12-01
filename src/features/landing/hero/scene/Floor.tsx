'use client';

import { useTexture } from '@react-three/drei';

export default function Floor() {
  // 여러 텍스쳐 맵을 한번에 로드
  // useTexture는 객체로 전달하면 각 텍스쳐를 키-값 쌍으로 반환
  const { baseColor, normal, roughness, ambientOcclusion, metallic } = useTexture({
    baseColor: '/ceramic_floor/base_color.webp', // 기본 색상과 세라믹 무늬
    normal: '/ceramic_floor/normal.webp', // 세라믹 결의 입체감
    roughness: '/ceramic_floor/roughness.webp', // 표면 거칠기
    ambientOcclusion: '/ceramic_floor/ambient_occlusion.webp', // 주변 폐색
    metallic: '/ceramic_floor/metallic.webp', // 메탈릭 맵
  });

  const [width, height] = [80, 40]; // 바닥 크기를 더 크게 확장
  const repeatScale = 5;
  const [hRepeat, vRepeat] = [width / repeatScale, height / repeatScale];

  [baseColor, normal, roughness, ambientOcclusion, metallic].forEach((texture) => {
    texture.wrapS = texture.wrapT = 1000; // RepeatWrapping (Three.js 상수값)
    texture.repeat.set(hRepeat, vRepeat); // 텍스쳐 반복
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow={true}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        map={baseColor}
        normalMap={normal}
        roughnessMap={roughness}
        aoMap={ambientOcclusion}
        metalnessMap={metallic}
        metalness={0.2}
      />
    </mesh>
  );
}
