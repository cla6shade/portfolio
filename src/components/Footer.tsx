import Flex from '@/components/container/Flex';

export default function Footer() {
  return (
    <footer className="bg-background py-8 border border-t-border">
      <Flex justify="center" align="center">
        <p className="text-sm text-gray-500">&copy; 2025 Cla6shade. All rights reserved.</p>
      </Flex>
    </footer>
  );
}
