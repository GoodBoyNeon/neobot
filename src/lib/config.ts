export interface ConfigType {
  clientId: string | undefined;
  testGuildId: string | undefined;
}

export const config: ConfigType = {
  clientId: process.env.CLIENT_ID,
  testGuildId: process.env.TEST_GUILD_ID,
};
