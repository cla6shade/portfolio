'use client';

interface XStandProps {
  width: number;
  yPosition: number;
}

export default function XStand({ width, yPosition }: XStandProps) {
  const legWidth = width * 0.7;
  const legHeight = 4;
  const legLength = 4;
  const angle = Math.atan2(legHeight, legWidth);

  return (
    <>
      {/* 왼쪽 위에서 오른쪽 아래로 가는 다리 */}
      <mesh
        position={[0, yPosition, 0]}
        rotation={[0, 0, angle]}
        castShadow
      >
        <cylinderGeometry args={[0.03, 0.03, legLength, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* 오른쪽 위에서 왼쪽 아래로 가는 다리 */}
      <mesh
        position={[0, yPosition, 0]}
        rotation={[0, 0, -angle]}
        castShadow
      >
        <cylinderGeometry args={[0.03, 0.03, legLength, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </>
  );
}
