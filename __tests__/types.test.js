const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a number', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('properly tells if a value is a string', () => {
      expect(isString('hello')).toBeTruthy();
      expect(isString('4')).toBeTruthy();
      expect(isString('true')).toBeTruthy();
      expect(isString(4)).toBeFalsy();
      expect(isString(true)).toBeFalsy();
    });

    it('properly tells if a value returns a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('true')).toBeFalsy();
      expect(isBoolean('false')).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
    });

    it('properly tells if a value is an array', () => {
      expect(isArray([1, 2, 3])).toBeTruthy();
      expect(isArray('array')).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(1)).toBeFalsy();
    });

    it('properly tells if a value is an object', () => {
      expect(isObject({ name: 'doug' })).toBeTruthy();
      expect(isObject([1, 2, 3])).toBeFalsy();
      expect(isObject('{}')).toBeFalsy();
      expect(isObject(1)).toBeFalsy();
      expect(isObject([{ name: 'doug' }])).toBeFalsy();
    });

    it('properly tells if a value is a function', () => {
      expect(isFunction(isNumber)).toBeTruthy();
      expect(isFunction(isNumber(3))).toBeFalsy();
      expect(isFunction('function')).toBeFalsy();
      expect(isFunction(1)).toBeFalsy();
      expect(isFunction(false)).toBeFalsy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws error if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString(3)).toEqual('3');
      expect(castToString('3')).toEqual('3');
      expect(castToString(true)).toEqual('true');
      expect(castToString({})).toEqual('{}');
    });

    it('throws error if a function expression is passed to castToString()', () => {
      expect(() => castToString(isString)).toThrowErrorMatchingSnapshot();
      expect(() => castToString(undefined)).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
  });

});
