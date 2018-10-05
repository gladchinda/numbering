/**
 * Checks if the given value is a finite number.
 * @param {any} value 
 * @returns {boolean}
 */
const isNumber = value => {
  return typeof value  === 'number' && isFinite(value);
}

/**
 * Checks if the given value is an integer.
 * @param {any} value 
 * @returns {boolean}
 */
const isInteger = value => {
  return Number.isInteger(value);
}

/**
 * Checks if the given value is a whole number.
 * @param {any} value 
 * @returns {boolean}
 */
const isWhole = value => {
  return isInteger(value) && value >= 0;
}

/**
 * Checks if the given value is a natural number.
 * @param {any} value 
 * @returns {boolean}
 */
const isNatural = value => {
  return isInteger(value) && value > 0;
}

/**
 * Returns an assertion function based on the given test function passed as `testFn`.
 * @param {function} testFn 
 * @returns {function} The assertion function
 */
const assert = testFn => {
  return (value, error) => {

    // Ensure that testFn is invokable
    if (typeof testFn === 'function') {
      // Invoke testFn with value
      const test = testFn(value);

      // Check if the returned value from testFn invocation is false
      if (typeof test === 'boolean' && !test) {

        // Determine if error is an Error instance and use it
        // Otherwise construct an error object based on the error argument
        const err = error instanceof Error
          ? error
          : new Error((typeof error === 'string' && error.trim()) || 'Invalid value.');

        // Throw the error
        throw err;

      }
    }

  }
}

/**
 * Asserts that the passed value is a finite number.
 * Throws the given error if it is not.
 * @param {any} value 
 * @param {string|Error} error
 * @throws {Error}
 */
const assertIsNumber = assert(isNumber);

/**
 * Asserts that the passed value is an integer.
 * Throws the given error if it is not.
 * @param {any} value 
 * @param {string|Error} error
 * @throws {Error}
 */
const assertIsInteger = assert(isInteger);

/**
 * Asserts that the passed value is a whole number.
 * Throws the given error if it is not.
 * @param {any} value 
 * @param {string|Error} error
 * @throws {Error}
 */
const assertIsWhole = assert(isWhole);

/**
 * Asserts that the passed value is a natural number.
 * Throws the given error if it is not.
 * @param {any} value 
 * @param {string|Error} error
 * @throws {Error}
 */
const assertIsNatural = assert(isNatural);

// Export the moodule
module.exports = {
  isNumber,
  isInteger,
  isWhole,
  isNatural,
  assertIsNumber,
  assertIsInteger,
  assertIsWhole,
  assertIsNatural
};
