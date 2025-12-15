'use client';

import { useEffect, useState } from 'react';
import throttle from '@/utils/throttle';

type ControllerItem = {
  level: number;
  positionY: number;
  href: string;
};

export default function useControl() {
  const [controllerItems, setControllerItems] = useState<ControllerItem[]>([]);
  const [currentFocused, setCurrentFocused] = useState<ControllerItem>();

  useEffect(() => {
    const items = getControlItems();
    const nearestItem = getNearestItem(items);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setControllerItems(items);
    setCurrentFocused(nearestItem);

    const scrollHandler = throttle(() => {
      const nearest = getNearestItem(items);
      setCurrentFocused(nearest);
    }, 100);

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  return { controllerItems, currentFocused };
}

function getControlItems() {
  const mainChild = document.querySelectorAll('main h1, h2, h3');
  if (mainChild.length === 0) return [];
  const items: ControllerItem[] = Array.from(
    mainChild.values().map((node) => {
      const positionY = node.getBoundingClientRect().bottom + window.scrollY;
      const level = getControlLevel(node.localName);
      const href = `#${node.id}`;
      return {
        positionY,
        level,
        href,
      };
    }),
  );
  return items;
}

function getControlLevel(localName: string) {
  switch (localName) {
    case 'h1':
      return 1;
    case 'h2':
      return 2;
    case 'h3':
      return 3;
    default:
      return 3;
  }
}

function getNearestItem(controllerItems: ControllerItem[]) {
  const offsetY = window.scrollY;
  let distance = Infinity;
  let nearest: ControllerItem | null = null;
  controllerItems.forEach((item) => {
    const itemDistance = Math.abs(offsetY - item.positionY);
    console.log(`offset: ${offsetY}, position: ${item.positionY}`);
    if (itemDistance > distance) return;
    distance = itemDistance;
    nearest = item;
  });
  return nearest!;
}
