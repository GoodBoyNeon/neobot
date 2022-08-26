import { logger } from './Logger';
export const validateNode = (): boolean => {
  try {
    const nodeVersion = process.version.slice(1).split('.')[0];

    if (Number(nodeVersion) < 16) {
      return false;
    }
  } catch (err) {
    logger.error(err as string);
  }
  return true;
};
