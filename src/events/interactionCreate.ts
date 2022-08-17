import {
	CacheType,
	CommandInteractionOptionResolver,
	Interaction,
} from 'discord.js';
import { client } from '..';
import { BaseClient } from '../structures/BaseClient';
import { StableInteraction } from '../structures/Command';
import { Event } from '../structures/Event';

export default new Event(
	'interactionCreate',
	async (interaction: Interaction) => {
		if (interaction.isChatInputCommand()) {
			await interaction.deferReply();
			const command = client.commands.get(interaction.commandName);

			if (!command) return;

			const params = {
				options:
					interaction.options as CommandInteractionOptionResolver<CacheType>,
				client: client as BaseClient,
				interaction: interaction as StableInteraction,
			};

			await command.run(params);
		}
	}
);
