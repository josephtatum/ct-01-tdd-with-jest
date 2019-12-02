const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray
} = require('./lib/types.js');

console.log(isNumber(3));
console.log(isString('3'));
console.log(isArray([1, 2, 3]));
console.log(isBoolean(true));
console.log(isObject({ name: 'doug' }));
console.log(isFunction(isNumber));
console.log(castToNumber('3'));
console.log(castToString(3));
console.log(castToBoolean(3));
console.log(castToArray(1, 2, 3));

