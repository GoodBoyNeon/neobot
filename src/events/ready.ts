import { Event } from '../structures/Event';
import { logger } from '../utils/Logger';

export default new Event('ready', async () => {
  logger.info('Bot has started!');
});
