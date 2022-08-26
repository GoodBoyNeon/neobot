import { Command } from '../../structures/Command';

export default new Command({
  name: 'ping',
  description: "Check the bot's status",
  run: async ({ interaction }) => {
    interaction.followUp('Pong!');
  },
});
