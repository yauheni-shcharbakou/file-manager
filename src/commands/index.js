import { up, cd, ls } from './nav.js';
import { os } from './os.js';
import { hash } from './hash.js';

const commandByName = {
  up,
  cd,
  ls,
  os,
  hash,
};

export const handleCommand = async (data, currentPath) => {
  const [command, ...args] = data.split(' ');
  const handler = commandByName[command];

  if (!handler) {
    console.log('Invalid input');
    return currentPath;
  }

  const changedPath = await handler(args, currentPath);
  return changedPath ?? currentPath;
};
