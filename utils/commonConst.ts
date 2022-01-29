export const linux = () => {
  return process.platform === "linux";
};

export const macOS = () => {
  return process.platform === "darwin";
};

export const windows = () => {
  return process.platform === "win32";
};

export const production = () => {
  return process.env.NODE_ENV !== "development";
};

export const dev = () => {
  return process.env.NODE_ENV === "development";
};
