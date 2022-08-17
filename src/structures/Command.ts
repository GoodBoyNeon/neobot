export class Command {
	constructor(commandOptions: CommandType) {
		Object.assign(this, commandOptions);
	}
}
import {
	ApplicationCommandDataResolvable,
	CommandInteraction,
	CommandInteractionOptionResolver,
	GuildMember,
	PermissionResolvable,
} from 'discord.js';
import { BaseClient } from './BaseClient';

export interface CommandType {
	name: string;
	desc: string;
	run: (options: FunctionParams) => Promise<void>;
	permissions?: PermissionResolvable[];
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
