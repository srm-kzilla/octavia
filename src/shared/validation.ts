export const validateRegex = (url, regex) => {
  let pattern = new RegExp(regex);
  return pattern.test(url);
};
