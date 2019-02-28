import Vector, { PRECISION } from '../vector';

expect.extend({
  toBeClassEqual(received, other) {
    const pass = received.equals(other);
    return {
      pass,
      message: () => `expected ${received.toString()} to be equal to ${other.toString()}`,
    };
  },
  toEqualApproximately(received, other) {
    const pass = Math.abs(received - other) <= PRECISION;
    return {
      pass,
      message: () => `expected ${received} to be equal to ${other}`,
    };
  },
});

describe('Vector', () => {
  describe('#equals()', () => {
    it('should determine that two identical vectors are equal', () => {
      const v1 = Vector.zero();
      const v2 = Vector.zero();
      expect(v1.equals(v2)).toBeTruthy();
    });

    it('should determine that two vectors are equal within the precision', () => {
      const v1 = new Vector(0.33333333, 1);
      const v2 = new Vector(0.33333335, 1);
      expect(v1.equals(v2)).toBeTruthy();
    });

    it('should determine that two unequal vectors are unequal', () => {
      const v1 = new Vector(5, 1);
      const v2 = new Vector(4, 1);
      expect(v1.equals(v2)).toBeFalsy();
    });
  });

  describe('#rotate()', () => {
    it('should be able to rotate a unit vector 90 degrees', () => {
      const input = new Vector(1, 0);
      expect(input.rotate(Math.PI/2)).toBeClassEqual(new Vector(0, 1));
      expect(input.rotate(Math.PI)).toBeClassEqual(new Vector(-1, 0));
      expect(input.rotate(3*Math.PI/2)).toBeClassEqual(new Vector(0, -1));
      expect(input.rotate(2*Math.PI)).toBeClassEqual(new Vector(1, 0));
    });

    it('should be able to rotate a unit vector 45 degrees', () => {
      const input = new Vector(1, 0);
      expect(input.rotate(Math.PI/2)).toBeClassEqual(new Vector(0, 1));
      expect(input.rotate(Math.PI)).toBeClassEqual(new Vector(-1, 0));
      expect(input.rotate(3*Math.PI/2)).toBeClassEqual(new Vector(0, -1));
      expect(input.rotate(2*Math.PI)).toBeClassEqual(new Vector(1, 0));
    });
  });

  describe('#fromVector()', () => {
    it('should create a new vector in the direction of the old vector', () => {
      const vec1 = new Vector(1, 1);
      const vec2 = Vector.fromVector(vec1, 5);
      expect(vec2.magnitude()).toEqualApproximately(5);
      expect(vec2.angle()).toEqualApproximately(vec1.angle());
    });

    it('should create a new vector in the direction of a slightly more complex vector', () => {
      const vec1 = new Vector(3, 7);
      const vec2 = Vector.fromVector(vec1, 8);
      expect(vec2.magnitude()).toEqualApproximately(8);
      expect(vec2.angle()).toEqualApproximately(vec1.angle());
    });
  });

  describe('#clamp()', () => {
    it('should not change a vector within the clamp range', () => {
      const vec1 = new Vector(0, 6);
      const vec2 = vec1.clamp(7);
      expect(vec2).toBeClassEqual(vec1);
    });

    it('should reduce a vector that is larger than the max', () => {
      const vec1 = new Vector(0, 6);
      const vec2 = vec1.clamp(5);
      expect(vec2).toBeClassEqual(new Vector(0, 5));
    });

    it('should increase a vector that is smaller than the min', () => {
      const vec1 = new Vector(0, 3);
      const vec2 = vec1.clamp(10, 4);
      expect(vec2).toBeClassEqual(new Vector(0, 4));
    })
  });
});
