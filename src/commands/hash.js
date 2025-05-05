import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { isAbsolute, join } from 'path';
import { createHash } from 'crypto';

export const hash = async (args, currentPath) => {
  const [path] = args;

  if (!path) {
    throw new Error('Path should be provided');
  }

  const joinArgs = isAbsolute(path) ? [path] : [currentPath, path];
  const filePath = join(...joinArgs);
  const cheaper = createHash('sha256');

  await pipeline(
    createReadStream(filePath, { encoding: 'utf-8' }),
    cheaper.setEncoding('hex'),
  );

  console.log(cheaper.read());
};
