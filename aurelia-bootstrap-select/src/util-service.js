export class UtilService {
  /**
   * Are 2 provided arrays equal
   * @param {array} a
   * @param {array} b
   * @return {bool} is eual
   */
  isArrayEqual(a, b) {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;

    //return a.every(_a => b.includes(_a));
    for (let i = 0; i < a.length; i++) {
        let aExistsInb = false;
        for (let j = 0; j < b.length && !aExistsInb; j++) {
            if (a[i] == b[j])
                aExistsInb = true;
        }
        if (!aExistsInb)
            return false;
    }
    return true;
  }

  /**
   * Are 2 provided variables equal
   * @param {any} a
   * @param {any} b
   * @return {bool} is eual
   */
  isEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      return this.isArrayEqual(a.sort(), b.sort());
    }
    return a === b;
  }

  /**
   * Find if the input array is an array of objects or not
   * @param {array} input array
   * @return {bool} result
   */
  isObjectArray(inputArrray) {
    return Array.isArray(inputArrray) && inputArrray.length > 0 && typeof inputArrray[0] === 'object';
  }

  /**
   * Find if the input argument is an object or not
   * @param {any} argument
   * @return {bool} result
   */
  isObject(arg) {
    return typeof arg === 'object';
  }

  /**
   * Find if the input argument is a string or not
   * @param {any} argument
   * @return {bool} result
   */
  isString(arg) {
    return typeof arg === 'string' || arg instanceof String;
  }

  /**
   * Find if the input array is an array of strings or not
   * @param {array} input array
   * @return {bool} result
   */
  isStringArray(inputArrray) {
    return Array.isArray(inputArrray) && inputArrray.length > 0 && typeof inputArrray[0] === 'string';
  }

  /**
   * Parse the argument to a boolean output
   * @param {any} input value
   * @return {bool} result
   */
  parseBool(value) {
    return (/^(true|1)$/i).test(value);
  }

  /**
   * Parse the argument to a boolean output when available, else return True on empty
   * @param {any} input value
   * @return {bool} result
   */
  parseBoolOrTrueOnEmpty(value) {
    return (value === undefined || value === '') ? true : this.parseBool(value);
  }
}
