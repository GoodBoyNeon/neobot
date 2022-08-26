import 'dotenv/config';
import { logger } from './Logger';
const envs = ['TOKEN', 'CLIENT_ID', 'TEST_GUILD_ID', 'ENVIRONMENT'];

export const validateEnv = (): boolean => {
  const missingEnvs: string[] = [];

  envs.forEach((env: string) => {
    const check = process.env[env];

    if (!check) {
      missingEnvs.push(env);
    }
  });

  if (missingEnvs.length > 0) {
    logger.error(`
      MISSING ENVS! The following envs are missing: ${missingEnvs.toString()}`);

    return false;
  }

  return true;
};
