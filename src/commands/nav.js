import { resolve, isAbsolute } from 'path';
import { stat, readdir } from 'fs/promises';

export const up = (_, currentPath) => {
  const potentialPath = resolve(currentPath, '..');

  if (potentialPath !== currentPath) {
    process.chdir(potentialPath);
  }
};

export const cd = async (args, currentPath) => {
  const [path] = args;

  if (!path) {
    throw new Error();
  }

  const resolveArgs = isAbsolute(path) ? [path] : [currentPath, path];
  const potentialPath = resolve(...resolveArgs);
  const pathStat = await stat(potentialPath);

  if (!pathStat.isDirectory()) {
    throw new Error();
  }

  process.chdir(potentialPath);
  return potentialPath;
};

export const ls = async (_, currentPath) => {
  const items = await readdir(currentPath, { withFileTypes: true });

  const data = items
    .map((item) => ({
      Name: item.name,
      Type: item.isDirectory() ? 'directory' : 'file',
    }))
    .sort((first, second) => {
      if (first.Type !== second.Type) {
        return first.Type === 'directory' ? -1 : 1;
      }

      return first.Name.localeCompare(second.Name);
    });

  console.table(data);
};
