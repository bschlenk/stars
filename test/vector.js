import Vector from '../src/vector';
import expect from 'expect';

expect.extend({
  toBeClassEqual(other) {
    expect.assert(
      this.actual.equals(other),
      'expected %s to be equal to %s',
      this.actual.toString(), other.toString()
    );
    return this;
  }
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
});
