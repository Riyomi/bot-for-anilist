const Discord = require("discord.js");
const { token } = require("./config.json");
const functions = require("./commands");
const { parseArgs } = require("./utils");

const client = new Discord.Client();

//TODO: add airing anime command

//TODO: this should be imported from a different module
const commands = [
  {
    command: "help",
    execute: help,
    description: "lists all available commands",
  },
  {
    command: "character",
    execute: functions.characterQuery,
    description: "information about a character",
  },
  {
    command: "user",
    execute: functions.userQuery,
    description: "information about a user",
  },
  {
    command: "user-faves",
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
    description: "characters of an anime (max. 5, sorted by popularity)",
  },
  {
    command: "manga-c",
    execute: functions.mangaCharactersQuery,
    description: "characters of a manga (max. 5, sorted by popularity)",
  },
];

//TODO: this too
//TODO: format the message (use either a code block or embed)
function help(message, args) {
  const embed = new Discord.MessageEmbed()
    .setTitle("Available commands")
    .setDescription(commands.map((c) => `**!${c.command}**: ${c.description}`));
  message.channel.send(embed);
}

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
