export function isNumeric(value: any) {
  return /^[+-]?\d+(\.\d+)?([Ee][+-]?\d+)?$/g.test(String(value));
}

export const isInt = (value: any) => typeof value === 'number' && /^\d+$/.test(String(value));

export const isFloat = (value: any) => typeof value === 'number' && /^\d+.(\d+)$/.test(String(value));

export const isRegex = (value: any) => value && value.constructor.name === 'RegExp';

export const isObject = (value: any) => value && typeof value === 'object';

export const isPlainObject = (value: any) => value && value.constructor.name === 'Object';

export const isValidId = (value: any) => Boolean(value && /^[A-Za-z]+[\w\-\:\.]*$/.test(String(value)));

export const isFormElement = (value: any) =>
  typeof HTMLFormElement === 'undefined' ? false : value instanceof HTMLFormElement;

export const isFormData = (value: any) => value instanceof FormData;

export const isIterable = (value: any) => value && typeof value[Symbol.iterator] === 'function';

export const isScalar = (value: any) => ['string', 'boolean', 'number', 'symbol', 'bigint'].includes(typeof value);

export const isPrimitive = (value: any) => ['string', 'boolean', 'number', 'bigint'].includes(typeof value);

export const isPromise = (value: any) => value && value.constructor.name === 'Promise';

export const isDate = (value: any) => value && typeof value === 'object' && value.constructor === Date;

export const isGenerator = (value: any) =>
  value && typeof value === 'object' && value.constructor.name === 'GeneratorFunction';

export const isEmpty = (value: any) => {
  if ([0, true, false].includes(value)) return false;

  if (value === undefined || value === null || value === '') return true;

  // check for map and set
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isIterable(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  // this is used here for zero
  if (isNumeric(value)) return false;

  return true;
};

export const isJson = (value: any) => {
  try {
    JSON.parse(value);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const isUrl = (value: any) => {
  try {
    new URL(value);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
};

export const isEmail = (value: any) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value,
  );

export const isFunction = (value: any) => typeof value === 'function';

export const Is = {
  fn: isFunction,
  numeric: isNumeric,
  int: isInt,
  float: isFloat,
  regex: isRegex,
  object: isObject,
  plainObject: isPlainObject,
  array: Array.isArray,
  validHtmlId: isValidId,
  formElement: isFormElement,
  form: isFormElement,
  formData: isFormData,
  iterable: isIterable,
  scalar: isScalar,
  primitive: isPrimitive,
  promise: isPromise,
  date: isDate,
  generator: isGenerator,
  empty: isEmpty,
  json: isJson,
  url: isUrl,
  email: isEmail,
};
