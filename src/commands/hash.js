import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { join } from 'path';
import { createHash } from 'crypto';

export const hash = async (args, currentPath) => {
  const [path] = args;

  if (!path) {
    throw new Error('Path should be provided');
  }

  const filePath = join(currentPath, path);
  const cheaper = createHash('sha256');

  await pipeline(
    createReadStream(filePath, { encoding: 'utf-8' }),
    cheaper.setEncoding('hex'),
  );

  console.log(cheaper.read());
};
