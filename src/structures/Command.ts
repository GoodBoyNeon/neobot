import {
  ApplicationCommandDataResolvable,
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
} from 'discord.js';
import { BaseClient } from './BaseClient';

export class Command {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}

export interface CommandType extends ChatInputApplicationCommandData {
	run: (options: FunctionParams) => Promise<void>;
}

export interface StableInteraction extends CommandInteraction {
	member: GuildMember;
}

interface FunctionParams {
	client: BaseClient;
	interaction: StableInteraction;
	options: CommandInteractionOptionResolver;
}

export interface RegisterCommandOptions {
	guildId?: string;
	commands: ApplicationCommandDataResolvable[];
}
