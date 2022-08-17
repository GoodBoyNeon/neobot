import {
	ApplicationCommandDataResolvable,
	Client,
	ClientEvents,
	Collection,
	IntentsBitField,
} from 'discord.js';
import 'dotenv/config';
import { readdirSync } from 'fs';
import path from 'path';
import { config, configType } from '../lib/config';
import { CommandType, RegisterCommandOptions } from './Command';
import { Event } from './Event';

const token = process.env.TOKEN;
const testGuildId = process.env.TEST_GUILD_ID;

const baseOptions = {
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMembers,
	],
};

export class BaseClient extends Client {
	config: configType;
	commands: Collection<string, CommandType>;

	constructor() {
		super(baseOptions);

		this.config = config;
		this.commands = new Collection();
	}

	async build() {
		this.loadModules();
		await this.login(token);
	}

	async init() {
		await this.login(token);
	}

	async loadModules() {
		// Commands --------

		const commands: ApplicationCommandDataResolvable[] = [];
		const commandFilesPath = path.join(__dirname, '..', 'commands');

		readdirSync(commandFilesPath).forEach(folder => {
			const commandFiles: string[] = readdirSync(
				`${commandFilesPath}/${folder}`
			).filter(file => file.endsWith('.ts'));

			commandFiles.forEach(async commandPath => {
				const command = await (
					await import(`../commands/${folder}/${commandPath}`)
				)?.default;
				if (!command.name || !command.desc) {
					const expression = command.name ? command.desc : command.name;
					return console.log(
						`${expression} cannot be null`,
						`One of the command has ${expression} as null!`
					);
				}

				this.commands.set(command.name, command);
				commands.push(command);
			});
			this.registerCommands({ guildId: testGuildId, commands });
		});

		// Events --------

		const eventFiles = readdirSync('./src/events').filter(fileName =>
			fileName.endsWith('ts')
		);

		eventFiles.forEach(async fileName => {
			const event: Event<keyof ClientEvents> = await (
				await import(`../events/${fileName}`)
			)?.default;

			this.on(event.event, event.run);
		});
	}

	async registerCommands({ guildId, commands }: RegisterCommandOptions) {
		if (guildId) {
			const guild = this.guilds.cache.get(guildId);
			guild?.commands.set(commands);
			console.log(`Registered Guild commands to ${guildId}`);
		}
		this.application?.commands.set(commands);
		console.log(`Registered Global commands.`);
	}

	// error(errHead: string, errBody: string): string {
	// 	const errorMsg = `${chalk.red.bold('Error:')} ${chalk.bold(errHead)}/n${
	// 		errBody ? chalk.gray(errBody) : ''
	// 	}`;
	// 	console.log(errorMsg);
	// 	return errorMsg;
	// }
}
