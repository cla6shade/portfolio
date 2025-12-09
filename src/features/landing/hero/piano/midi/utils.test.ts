import { describe, it, expect } from 'vitest';
import Utils from '@/features/landing/hero/piano/midi/Utils';

describe('Utils', (): void => {
  describe('byteToHex', (): void => {
    it('should return hex value from byte', (): void => {
      expect(Utils.byteToHex(127)).toBe('7f');
    });
  });

  describe('bytesToHex', (): void => {
    it('should return hex value from array of bytes', (): void => {
      const bytes: Uint8Array<ArrayBuffer> = new Uint8Array([127, 58]);
      expect(Utils.bytesToHex(bytes)).toBe('7f3a');
    });
  });

  describe('hexToNumber', (): void => {
    it('should return base 10 value from hex string', (): void => {
      expect(Utils.hexToNumber('fe')).toBe(254);
    });
  });

  describe('bytesToNumber', (): void => {
    it('should return base 10 value from array of bytes', (): void => {
      const bytes: Uint8Array<ArrayBuffer> = new Uint8Array([14, 22, 3]);
      expect(Utils.bytesToNumber(bytes)).toBe(923139);
    });
  });

  describe('bytesToLetters', (): void => {
    it('should return string from array of bytes', (): void => {
      const bytes: Uint8Array<ArrayBuffer> = new Uint8Array([77, 116, 104, 100]);
      expect(Utils.bytesToLetters(bytes)).toBe('Mthd');
    });
  });

  describe('decToBinary', (): void => {
    it('should return binary value from decimal', (): void => {
      expect(Utils.decToBinary(22)).toBe('10110');
    });
  });

  describe('readVarInt', (): void => {
    it('should return binary value from decimal', (): void => {
      const bytes: Uint8Array<ArrayBuffer> = new Uint8Array([128, 42]);
      expect(Utils.readVarInt(bytes)).toBe(42);
    });
  });
});
