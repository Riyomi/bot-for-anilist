const Discord = require("discord.js");
const { token } = require("./config.json");
const functions = require("./commands");
const { parseArgs, PREFIX } = require("./utils");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  const { command, args } = parseArgs(message);

  commands.find((c) => {
    if (c.command === command) c.execute(message, args);
  });
});

client.login(token);

const commands = [
  {
    command: "help",
    execute: help,
    description: "list of available commands",
  },
  {
    command: "clear",
    execute: clearAll,
    description: "deletes all bot related messages in the current channel",
  },
  {
    command: "char",
    execute: functions.characterQuery,
    description: "information about a character",
  },
  {
    command: "user",
    execute: functions.userQuery,
    description: "information about a user",
  },
  {
    command: "user-f",
    execute: functions.userFavesQuery,
    description: "favorite anime, manga and characters of a user",
  },
  {
    command: "anime",
    execute: functions.animeQuery,
    description: "information about an anime",
  },
  {
    command: "manga",
    execute: functions.mangaQuery,
    description: "information about a manga",
  },
  {
    command: "anime-c",
    execute: functions.animeCharactersQuery,
    description: "top 10 characters of the given anime sorted by popularity",
  },
  {
    command: "manga-c",
    execute: functions.mangaCharactersQuery,
    description: "top 10 characters of the given manga sorted by popularity",
  },
];

function help(message, args) {
  const embed = new Discord.MessageEmbed()
    .setTitle("Available commands")
    .setDescription(commands.map((c) => `**!${c.command}**: ${c.description}`));
  message.channel.send(embed);
}

async function clearAll(message, args) {
  const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
  const messagesForDeletion = fetchedMessages.filter(
    (m) => m.content.startsWith(PREFIX) || m.author.id === client.user.id
  );

  message.channel.bulkDelete(messagesForDeletion);
}
