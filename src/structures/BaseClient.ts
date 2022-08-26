import { Client, ClientEvents, Collection, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import { glob } from 'glob';
import { promisify } from 'util';
import { config, ConfigType } from '../lib/config';
import { logger } from '../utils/Logger';
import { CommandType } from './Command';
import { Event } from './Event';
const token = process.env.TOKEN;
const testGuildId = process.env.TEST_GUILD_ID;
const globPromise = promisify(glob);

const baseOptions = {
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
  ],
};

export class BaseClient extends Client {
  config: ConfigType;
  commands: Collection<string, CommandType>;

  constructor() {
    super(baseOptions);

    this.config = config;
    this.commands = new Collection();
  }

  /**
   * Get Methods
   */
  get id(): string | undefined {
    return this.user?.id;
  }

  get username(): string | undefined {
    return this.user?.username;
  }

  get usertag(): string | undefined {
    return this.user?.tag;
  }

  /**
   * Initilization functions
   */
  async build() {
    this.loadEvents();
    await this.login(token).catch(err => logger.error(err));
    this.loadCommands();
  }

  async connect() {
    await this.login(token);
  }

  /**
   * Helpers
   */
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  /**
   * Module loaders
   */
  async loadEvents() {
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    eventFiles.forEach(async file => {
      const event: Event<keyof ClientEvents> = await this.importFile(file);

      this.on(event.event, event.run);
    });
  }

  async loadCommands() {
    const commands: CommandType[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    );

    commandFiles.forEach(async file => {
      const command: CommandType = await this.importFile(file);

      if (!command.name) {
        return;
      }

      this.commands.set(command.name, command);
      commands.push(command);
      this.registerCommands({ guildId: testGuildId, commands });
    });
  }

  /**
   * Miscs
   */
  async registerCommands({ guildId, commands }: paramsType) {
    if (!token) {
      return logger.error('Token missing!');
    }

    if (guildId) {
      const guild = this.guilds.cache.get(guildId);

      if (!guild) {
        return logger.error(
          "The provided guildId doesn't belong to any guilds!"
        );
      }

      await guild?.commands
        .set(commands)
        .then(() =>
          logger.info(
            `Registered ${commands.length} application (/) commands to ${guild.name}`
          )
        )
        .catch(err => logger.error(err));
      return;
    }
    await this.application?.commands
      .set(commands)
      .then(() =>
        logger.info(`Registered ${commands.length} application (/) commands.`)
      );
  }
}

interface paramsType {
  guildId?: string;
  commands: CommandType[];
}
