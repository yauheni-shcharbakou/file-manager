import { up, cd, ls } from './nav.js';

const commandByName = {
  up,
  cd,
  ls,
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
