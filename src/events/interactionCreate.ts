import {
  CacheType,
  CommandInteractionOptionResolver,
  Interaction,
} from 'discord.js';
import { client } from '..';
import { StableInteraction } from '../structures/Command';
import { Event } from '../structures/Event';

export default new Event(
  'interactionCreate',
  async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      return await handleCommands(interaction as StableInteraction);
    }
  }
);

const handleCommands = async (interaction: StableInteraction) => {
  await interaction.deferReply();
  const command = client.commands.get(interaction.commandName);
  if (command == null) return;

  const params = {
    options: interaction.options as CommandInteractionOptionResolver<CacheType>,
    client,
    interaction,
  };

  await command.run(params);
};
