/**
 * Accepts an URL and a regex and tests it and returns the result as a boolean value
 * @param {string} url The url to be tested
 * @param {string} regex The regex pattern 
 * @returns {boolean} Returns a boolean value after Regex test
 */

export const validateRegex = ( url: string, regex: string ): boolean =>
{
  let pattern = new RegExp(regex);
  return pattern.test(url);
};
