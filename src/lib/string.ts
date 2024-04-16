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

export const getUserInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
};

export const isUUID = (str: string) => {
  const uuidRegex =
    /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
  return uuidRegex.test(str);
};

export const usernameFormat = (str: string) => {
  return str.replace(/[^a-zA-Z0-9._-]/g, "");
};
