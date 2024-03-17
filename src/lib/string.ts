export const removeExtraSpaces = (str: string) => {
  return str.replace(/\s+/g, " ").trim();
};

export const removeSpaceBetweenWords = (str: string) => {
  return str.replace(/\s+/g, " ");
};

export const haveLowerCase = (str: string) => {
  return /[a-z]/.test(str);
};
export const haveUpperCase = (str: string) => {
  return /[A-Z]/.test(str);
};
export const haveSpecialSymbol = (str: string) => {
  return /[$&+,:;=?@#|'<>.^*()%!-]/.test(str);
};
