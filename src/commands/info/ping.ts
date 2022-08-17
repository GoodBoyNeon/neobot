import { Command } from '../../structures/Command';

export default new Command({
	name: 'ping',
	desc: "Check the bot's status",
	run: async ({ interaction }) => {
		interaction.followUp('Pong!');
	},
});
