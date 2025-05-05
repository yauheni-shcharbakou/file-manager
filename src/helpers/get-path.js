import { isAbsolute, relative } from 'path';

export const getPath = (currentPath, path) => {
  return isAbsolute(path) ? path : relative(currentPath, path);
};
