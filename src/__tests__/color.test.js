import Color from '../color';

describe('Color', () => {
  describe('#fromString()', () => {
    it('should parse a regular hex string', () => {
      const color = Color.fromString('#1234AB');
      expect(color).toEqual(new Color(18, 52, 171));
    });

    it('should parse a lowercase hex string', () => {
      const color = Color.fromString('#1234ab');
      expect(color).toEqual(new Color(18, 52, 171));
    });

    it('should parse a short hex string', () => {
      const color = Color.fromString('#AB2');
      expect(color).toEqual(new Color(170, 187, 34));
    });

    it('should parse a lowercase short hex string', () => {
      const color = Color.fromString('#ab2');
      expect(color).toEqual(new Color(170, 187, 34));
    });

    it('should parse an rgb color string', () => {
      const color = Color.fromString('rgb(18, 52, 171)');
      expect(color).toEqual(new Color(18, 52, 171));
    });

    it('should parse an rgba color string', () => {
      const color = Color.fromString('rgba(18, 52, 171, 0.2)');
      expect(color).toEqual(new Color(18, 52, 171, 0.2));
    });

    it('should return null for invalid strings', () => {
      expect(Color.fromString('abc')).toBeNull();
      expect(Color.fromString('invalid')).toBeNull();
      expect(Color.fromString('rgb()')).toBeNull();
      expect(Color.fromString('rgb(1, 2, E)')).toBeNull();
    });
  });
});
