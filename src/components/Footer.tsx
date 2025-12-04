import Flex from '@/components/container/Flex';

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <Flex justify="center" align="center">
        <p className="text-sm text-gray-500">
          &copy; 2025 Cla6shade. All rights reserved.
        </p>
      </Flex>
    </footer>
  );
}