import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { config } from "dotenv";

config();
const TOKEN = process.env.LUNA_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
  intents: ["Guilds", "GuildMessages", GatewayIntentBits.MessageContent],
});

// Slash commands configuration
const rest = new REST({ version: "10" }).setToken(TOKEN);

client.once("ready", () => {
  console.log(`${client.user.username} has been started!`);
});

async function main() {
  const commands = [
    {
      name: "hello",
      description: "Say hello to you",
    },
  ];

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (err) {
    console.error(err);
  }
}

main();

/*

client.on("messageCreate", (message) => {
  console.log(message.content);
  console.log(message.author.username);
});

client.on("channelCreate", (channel) => {
  console.log(`The channel "${channel.name}" has been created!`);
});

client.on('channelPinsUpdate', (channel, date) => {
    console.log(`The channel ${channel.name} has been pinned in ${date}`)
})
*/
