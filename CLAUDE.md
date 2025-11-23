# Claude Development Guide

이 문서는 AI 어시스턴트가 이 포트폴리오 프로젝트의 코드를 작성할 때 반드시 따라야 할 가이드라인입니다.

## 프로젝트 개요

Next.js 기반 포트폴리오 랜딩 페이지 프로젝트입니다.

### 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript 5 (strict mode)
- **스타일링**: Tailwind CSS v4
- **패키지 매니저**: pnpm 10.12.4
- **UI 라이브러리**: shadcn/ui, Radix UI
- **3D 그래픽**: Three.js, React Three Fiber, Drei
- **애니메이션**: GSAP, Lenis
- **테스팅**: Vitest
- **기타**: Soundfont Player, Lucide Icons

## 프로젝트 구조

```
portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                   # 공용 컴포넌트
│   ├── DefaultPad.tsx
│   ├── Navigation.tsx
│   ├── CardSwap.tsx
│   └── ui/                      # shadcn/ui 컴포넌트
│       ├── button.tsx
│       ├── navigation-menu.tsx
│       └── sheet.tsx
├── features/                     # 기능별 모듈
│   ├── hero/                    # 히어로 섹션 (3D 피아노)
│   │   ├── HeroSection.tsx
│   │   ├── HeroTextSection.tsx
│   │   ├── HeroProvider.tsx
│   │   ├── scene/               # Three.js 장면
│   │   └── piano/               # 피아노 모델
│   └── projects/                # 프로젝트 섹션
│       ├── ProjectsSection.tsx
│       ├── ProjectCard.tsx
│       └── ProjectDetail.tsx
├── hooks/                        # 커스텀 훅
│   └── useIntersectionObserver.ts
├── lib/                          # 유틸리티
│   └── utils.ts
└── public/                       # 정적 자산
    ├── projects/
    └── floor/
```

## 필수 코딩 규칙

### 1. React Import 규칙

**절대 React UMD Global을 직접 import하여 사용하지 말 것.**

```typescript
// [잘못된 예시]
import React from 'react';
const Component: React.FC = () => { ... };

// [올바른 예시]
import { useState, useEffect, type ReactNode } from 'react';

function Component({ children }: { children: ReactNode }) {
  const [state, setState] = useState(0);
  return <div>{children}</div>;
}
```

필요한 함수와 타입만을 named import로 가져옵니다:
- Hooks: `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback` 등
- Types: `type ReactNode`, `type CSSProperties` 등
- Context: `createContext`, `use` (단, `useContext`는 사용 금지)

### 2. 컴포넌트 선언 규칙

**컴포넌트 모듈의 default export는 항상 함수 선언문으로 작성.**

```typescript
// [잘못된 예시]잘못된 예시
const MyComponent = () => { ... };
export default MyComponent;

// [잘못된 예시]잘못된 예시
export default () => { ... };

// [잘못된 예시]절대 사용 금지
const MyComponent: React.FC<Props> = ({ ... }) => { ... };

// [올바른 예시]올바른 예시
export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  return <div>{prop1}</div>;
}
```

**이유**: 함수 선언문(`function` 키워드)은 명확한 함수 이름을 제공하고, 디버깅과 스택 트레이스 추적에 유리합니다. `React.FC`는 절대 사용하지 않습니다.

### 3. Ref 전달 규칙

**forwardRef를 사용하지 말 것. ref 객체를 직접 props로 전달.**

```typescript
// [잘못된 예시]잘못된 예시
import { forwardRef } from 'react';
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// [올바른 예시]올바른 예시
import { type RefObject } from 'react';

interface InputProps {
  inputRef: RefObject<HTMLInputElement>;
  // 기타 props...
}

export default function Input({ inputRef, ...props }: InputProps) {
  return <input ref={inputRef} {...props} />;
}

// 사용
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);
  return <Input inputRef={inputRef} />;
}
```

### 4. Context 사용 규칙

**useContext를 사용하지 말 것. React 19의 use 훅을 사용.**

```typescript
// [잘못된 예시]잘못된 예시
import { useContext } from 'react';
const value = useContext(MyContext);

// [올바른 예시]올바른 예시
import { createContext, use, type ReactNode } from 'react';

type TMyContext = {
  value: string;
  setValue: (value: string) => void;
};

export const MyContext = createContext<TMyContext>({
  value: '',
  setValue: () => {},
});

export function MyContextProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState('');

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// 커스텀 훅으로 제공
export function useMyContext() {
  return use(MyContext);
}

// 사용
function Component() {
  const { value, setValue } = useMyContext();
  // ...
}
```

**참고**: `features/hero/HeroProvider.tsx`를 참조하세요.

### 5. Tailwind CSS v4 규칙

**tailwind.config.ts를 만들거나 수정하지 말 것. app/globals.css를 수정.**

Tailwind CSS v4는 PostCSS 기반 설정을 사용합니다.

```css
/* app/globals.css */

@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* 커스텀 색상 정의 */
  --color-custom: oklch(0.5 0.2 180);

  /* 커스텀 애니메이션 정의 */
  --animate-my-animation: my-animation 1s ease-out;

  @keyframes my-animation {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
}

:root {
  /* 라이트 테마 색상 (OKLch 사용) */
  --radius: 0.625rem;
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
}

.dark {
  /* 다크 테마 색상 */
  --primary: oklch(0.922 0 0);
  --background: oklch(0.145 0 0);
}
```

**주요 특징**:
- `@theme inline` 블록에서 커스텀 색상, 애니메이션 정의
- OKLch 색상 공간 사용 (oklch(lightness chroma hue))
- CSS 변수로 테마 관리
- `.dark` 클래스로 다크 모드 전환

### 6. shadcn/ui 활용

**필요한 경우 shadcn의 컴포넌트를 적극 활용.**

```bash
# shadcn/ui 컴포넌트 설치
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add navigation-menu
```

설치된 컴포넌트는 `components/ui/` 디렉토리에 위치합니다.

```typescript
// 사용 예시
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function MyComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <p>Dialog content</p>
      </DialogContent>
    </Dialog>
  );
}
```

**참고**: `components.json` 설정 파일을 확인하세요.

### 7. 패키지 매니저 규칙

**pnpm을 사용.**

```bash
# 의존성 설치
pnpm install

# 패키지 추가
pnpm add package-name

# dev 의존성 추가
pnpm add -D package-name

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```

**절대 npm, yarn을 사용하지 말 것.**

### 8. TypeScript 타입 규칙

**절대 간단하게 타이핑하거나 any 타입을 사용하지 말 것. Strictly type.**

```typescript
// [잘못된 예시]잘못된 예시
function handleClick(e: any) { ... }
const data: any = fetchData();

// [잘못된 예시]잘못된 예시 (너무 느슨한 타입)
function process(data: object) { ... }

// [올바른 예시]올바른 예시
import { type MouseEvent } from 'react';
import { type ThreeEvent } from '@react-three/fiber';

// 필요한 타입을 모듈 상단에 선언
interface UserData {
  id: number;
  name: string;
  email: string;
}

interface ClickEventData {
  x: number;
  y: number;
  target: HTMLElement;
}

function handleClick(e: MouseEvent<HTMLButtonElement>) {
  const { clientX, clientY, currentTarget } = e;
  // ...
}

function handle3DClick(e: ThreeEvent<MouseEvent>) {
  e.stopPropagation();
  // ...
}

async function fetchUser(id: number): Promise<UserData> {
  const response = await fetch(`/api/users/${id}`);
  return response.json() as UserData;
}
```

**타입 찾기**:
1. 라이브러리 타입 정의 확인: `@types/` 패키지 또는 라이브러리 자체의 타입
2. `node_modules/` 내 `.d.ts` 파일 참조
3. 커스텀 타입은 인터페이스나 타입 별칭으로 모듈 상단에 선언

**tsconfig.json 설정**:
```json
{
  "compilerOptions": {
    "strict": true,  // strict mode 활성화
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react-jsx",
    "types": ["@react-three/fiber"]
  }
}
```

### 9. React.FC 사용 금지

**React.FC를 절대 사용하지 말 것. 일반 함수 사용.**

```typescript
// [잘못된 예시]절대 사용 금지
import React from 'react';

const Component: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

// [올바른 예시]올바른 예시
import { type ReactNode } from 'react';

interface ComponentProps {
  children: ReactNode;
  title?: string;
}

export default function Component({ children, title }: ComponentProps) {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}
```

**이유**:
- `React.FC`는 암묵적으로 `children`을 포함하여 타입 안정성을 해칩니다
- 명시적인 props 타입이 더 명확하고 안전합니다
- 제네릭 사용이 복잡해집니다

### 10. DefaultPad 컴포넌트 사용

**화면 컨텐츠의 위치와 너비를 맞출 때 DefaultPad.tsx를 사용.**

```typescript
import DefaultPad from '@/components/DefaultPad';

export default function Section() {
  return (
    <DefaultPad className="py-20">
      <h1>Section Title</h1>
      <p>Content with consistent horizontal padding</p>
    </DefaultPad>
  );
}
```

**DefaultPad 구현** (`components/DefaultPad.tsx`):
```typescript
import { type ReactNode } from 'react';

interface DefaultPadProps {
  children: ReactNode;
  className?: string;
}

export default function DefaultPad({ children, className = '' }: DefaultPadProps) {
  return <div className={`px-16 md:px-20 lg:px-60 ${className}`}>{children}</div>;
}
```

**반응형 패딩**:
- 모바일: `px-16` (64px)
- 태블릿: `md:px-20` (80px)
- 데스크톱: `lg:px-60` (240px)

**사용 예시**:
- `Navigation.tsx`: 네비게이션 바
- `ProjectsSection.tsx`: 프로젝트 섹션

### 11. useEffect State 변경 규칙

**useEffect 내부에서 directly state change를 하지 말 것.**

```typescript
// [잘못된 예시]잘못된 예시
useEffect(() => {
  setState(newValue); // 직접적인 state 변경
}, [dependency]);

// [올바른 예시]올바른 예시 1: 이벤트 리스너 등록
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// [올바른 예시]올바른 예시 2: 초기화만 수행
useEffect(() => {
  // 초기 설정이나 외부 라이브러리 초기화만 수행
  const lenis = new Lenis();
  lenis.start();

  return () => {
    lenis.destroy();
  };
}, []);

// [올바른 예시]올바른 예시 3: cleanup만 수행
useEffect(() => {
  return () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, []);
```

**예외 사항**: 이벤트 리스너를 useEffect 사이클 내부에서 등록하는 경우에만 이벤트 핸들러에서 state를 변경할 수 있습니다.

**이유**: useEffect 내부에서의 직접적인 state 변경은 예측 불가능한 리렌더링과 무한 루프를 유발할 수 있습니다.

**추가 규칙: State 의존성 체인 금지**

특정 state가 변할 때 다른 state를 변경하는 useEffect 체인을 만들지 말 것. 대신 함수 래핑 패턴을 사용.

```typescript
// [잘못된 예시]잘못된 예시: useEffect 체인
function Parent() {
  const [count, setCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);

  // 안티패턴: count가 변할 때 doubleCount를 변경
  useEffect(() => {
    setDoubleCount(count * 2);
  }, [count]);

  return <Child count={count} doubleCount={doubleCount} />;
}

// [올바른 예시]올바른 예시: 함수 래핑 패턴
function Parent() {
  const [count, setCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);

  // count를 변경하는 함수를 래핑하여 doubleCount도 함께 변경
  const updateCount = (newCount: number) => {
    setCount(newCount);
    setDoubleCount(newCount * 2);
  };

  return <Child count={count} doubleCount={doubleCount} onUpdateCount={updateCount} />;
}

// Child는 updateCount를 호출
function Child({ count, doubleCount, onUpdateCount }: ChildProps) {
  return (
    <button onClick={() => onUpdateCount(count + 1)}>
      Count: {count}, Double: {doubleCount}
    </button>
  );
}
```

**핵심**:
- useEffect로 state 의존성 체인을 만들지 말 것
- state 변경 함수를 래핑하여 관련된 모든 state를 한 번에 업데이트
- 래핑된 함수를 하위 컴포넌트에 props로 전달

### 12. DOM 애니메이션 규칙

**애니메이션이나 transform을 state로 관리하지 말 것. ref object를 전달.**

```typescript
// [잘못된 예시]잘못된 예시
function AnimatedComponent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animate = () => {
      setPosition(prev => ({ x: prev.x + 1, y: prev.y }));
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return <div style={{ transform: `translate(${position.x}px, ${position.y}px)` }} />;
}

// [올바른 예시]올바른 예시
import { useRef, useEffect, type RefObject } from 'react';

function AnimatedComponent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0;

    const animate = () => {
      if (elementRef.current) {
        x += 1;
        elementRef.current.style.transform = `translateX(${x}px)`;
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div ref={elementRef} />;
}

// [올바른 예시]올바른 예시 (GSAP 사용)
import gsap from 'gsap';

function GSAPComponent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      x: 100,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  return <div ref={elementRef} />;
}

// [올바른 예시]올바른 예시 (ref를 하위 컴포넌트에 전달)
interface AnimatedChildProps {
  elementRef: RefObject<HTMLDivElement>;
}

function AnimatedChild({ elementRef }: AnimatedChildProps) {
  return <div ref={elementRef}>Animated content</div>;
}

function Parent() {
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!childRef.current) return;

    // 애니메이션 로직
    gsap.to(childRef.current, { x: 100 });
  }, []);

  return <AnimatedChild elementRef={childRef} />;
}
```

**이유**:
- 애니메이션 프레임마다 state를 변경하면 불필요한 리렌더링이 발생합니다
- ref를 사용하면 DOM을 직접 조작하여 성능이 향상됩니다
- GSAP 같은 애니메이션 라이브러리는 DOM 조작을 기반으로 동작합니다

**참고**:
- `features/hero/HeroProvider.tsx`: 카메라 애니메이션에서 ref 사용
- `components/CardSwap.tsx`: GSAP 애니메이션

### 13. 테스트 작성 규칙

**테스트는 반드시 Vitest를 사용하고, UMD Global을 사용하지 말 것.**

```typescript
// [잘못된 예시]잘못된 예시: UMD Global 사용
// describe, it 등이 전역에서 자동으로 사용 가능하다고 가정
describe('MyComponent', () => {
  it('should render correctly', () => {
    expect(true).toBe(true);
  });
});

// [올바른 예시]올바른 예시: Vitest에서 직접 import
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should call onClick handler', () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);

    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**필수 import 목록**:
- **테스트 구조**: `describe`, `it` (또는 `test`)
- **Assertion**: `expect`
- **Mock**: `vi`
- **라이프사이클**: `beforeEach`, `afterEach`, `beforeAll`, `afterAll`

**테스트 파일 작성 규칙**:
```typescript
// MyComponent.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders with correct props', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

**vitest.config.ts 설정**:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: false, // UMD Global 비활성화
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

**이유**:
- 명시적인 import는 코드의 의존성을 명확하게 합니다
- UMD Global은 타입 안정성을 해치고 예측 불가능한 동작을 유발할 수 있습니다
- 모던 JavaScript/TypeScript 모듈 시스템과 일관성을 유지합니다

### 14. Import 경로 규칙

**프로젝트 내부 모듈을 import할 때는 절대 상대 경로를 사용하지 말 것. 항상 절대 경로(@/ alias)를 사용.**

```typescript
// [잘못된 예시]잘못된 예시: 상대 경로 사용
import Button from '../../../components/ui/button';
import { useHero } from '../../hero/HeroProvider';
import DefaultPad from '../DefaultPad';

// [올바른 예시]올바른 예시: 절대 경로(@/ alias) 사용
import { Button } from '@/components/ui/button';
import { useHero } from '@/features/hero/HeroProvider';
import DefaultPad from '@/components/DefaultPad';

// [올바른 예시]예외: 같은 디렉토리 내 constants나 types는 상대 경로 허용
import { PIANO_POSITION } from './constants';
import { type PianoKeyProps } from './types';
```

**규칙**:
- 다른 디렉토리의 모듈은 무조건 `@/` 사용
- 같은 디렉토리 내 파일만 `./` 상대 경로 허용
- 부모 디렉토리(`../`) 경로는 절대 사용 금지

**tsconfig.json 설정**:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**이유**:
- 파일 이동 시 import 경로 수정이 불필요
- 깊은 중첩 구조에서 `../../../`를 피할 수 있음
- 코드 가독성과 유지보수성 향상
- import 경로가 명확하고 일관성 있음

## 추가 베스트 프랙티스

### Client Component vs Server Component

```typescript
// Server Component (기본값)
// - 데이터 페칭
// - 정적 콘텐츠
// - SEO 중요한 콘텐츠
export default function ServerComponent() {
  return <div>Static content</div>;
}

// Client Component
// - 인터랙션 필요
// - 브라우저 API 사용 (window, document)
// - useState, useEffect 등 훅 사용
'use client';

export default function ClientComponent() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}
```

### 스타일링 방법

1. **Tailwind 유틸리티 클래스** (주요 방법)
```typescript
<div className="px-16 md:px-20 lg:px-60 bg-background text-foreground">
```

2. **조건부 클래스 (clsx + tailwind-merge)**
```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  "base-class",
  condition && "conditional-class",
  className
)}>
```

3. **인라인 스타일** (동적 값)
```typescript
<div style={{ width: `${width}px`, height: `${height}px` }}>
```

4. **GSAP 프로그래매틱 애니메이션**
```typescript
gsap.to(element, {
  x: 100,
  y: 50,
  rotation: 45,
  duration: 1,
});
```

### 파일 구조 규칙

- **컴포넌트**: 한 파일당 하나의 default export 컴포넌트
- **타입**: 같은 파일 상단에 interface/type 선언
- **상수**: `constants.ts` 파일로 분리
- **유틸리티**: `lib/` 디렉토리에 배치
- **훅**: `hooks/` 디렉토리에 배치

### Import 순서

```typescript
// 1. React 및 Next.js
import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 2. 외부 라이브러리
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';

// 3. 내부 절대 경로 import
import DefaultPad from '@/components/DefaultPad';
import { useHero } from '@/features/hero/HeroProvider';

// 4. 상대 경로 import
import { PIANO_POSITION } from './constants';

// 5. 스타일 및 타입
import { cn } from '@/lib/utils';
import { type MyCustomType } from './types';
```

## 주요 참고 파일

코드 작성 시 다음 파일들을 참고하세요:

- `components/DefaultPad.tsx` - 기본 컴포넌트 패턴
- `features/hero/HeroProvider.tsx` - Context + use 훅 패턴
- `features/hero/piano/PianoKey.tsx` - 타입 안전 이벤트 처리
- `components/CardSwap.tsx` - GSAP 애니메이션 + ref 사용
- `app/globals.css` - Tailwind v4 설정
- `tsconfig.json` - TypeScript 설정

## 요약 체크리스트

코드를 작성하기 전에 다음을 확인하세요:

- [ ] React는 named import만 사용 (React.FC 금지)
- [ ] 컴포넌트는 `function` 키워드로 선언
- [ ] forwardRef 대신 ref를 props로 전달
- [ ] useContext 대신 use 훅 사용
- [ ] Tailwind 설정은 globals.css에만 작성
- [ ] shadcn/ui 컴포넌트 적극 활용
- [ ] 패키지 매니저는 pnpm만 사용
- [ ] any 타입 절대 금지, 모든 타입 명시
- [ ] React.FC 절대 사용 금지
- [ ] DefaultPad로 화면 너비 맞춤
- [ ] useEffect 내부에서 직접 state 변경 금지
- [ ] useEffect로 state 의존성 체인 만들지 말고 함수 래핑 패턴 사용
- [ ] 애니메이션은 ref로 DOM 직접 조작
- [ ] 테스트는 Vitest 사용, describe/it/expect 명시적 import
- [ ] 프로젝트 내부 모듈은 절대 경로(@/) 사용, 상대 경로 금지

이 규칙들을 준수하여 일관성 있고 유지보수 가능한 코드를 작성하세요.
