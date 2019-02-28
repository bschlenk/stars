import Box from '../box';
import Vector from '../vector';

describe('Box', () => {
  describe('#overlaps()', () => {
    it('should return true if two boxes overlap', () => {
      const box1A = Vector.zero();
      const box1B = new Vector(5, 5);
      const box1 = new Box(box1A, box1B);

      const box2A = new Vector(4, 3);
      const box2B = new Vector(7, 7);
      const box2 = new Box(box2A, box2B);

      expect(box1.overlaps(box2)).toBeTruthy();
    });

    it('should return false if two boxes do not overlap', () => {
      const box1A = Vector.zero();
      const box1B = new Vector(5, 5);
      const box1 = new Box(box1A, box1B);

      const box2A = new Vector(6, 6);
      const box2B = new Vector(7, 7);
      const box2 = new Box(box2A, box2B);

      expect(box1.overlaps(box2)).toBeFalsy();
    });

    it('should return true if two boxes touch', () => {
      const box1A = Vector.zero();
      const box1B = new Vector(5, 5);
      const box1 = new Box(box1A, box1B);

      const box2A = new Vector(5, 5);
      const box2B = new Vector(7, 7);
      const box2 = new Box(box2A, box2B);

      expect(box1.overlaps(box2)).toBeTruthy();
    });
  });
});
