const Discord = require("discord.js");
const { token } = require("./config.json");
const functions = require("./commands");
const { parseArgs } = require("./utils");

const client = new Discord.Client();

// this should be imported from a different module
const commands = [
  {
    command: "help",
    execute: help,
    description: "Lists all the available commands",
  },
  {
    command: "character",
    execute: functions.characterQuery,
    description: "Gives information about a character",
  },
  {
    command: "user",
    execute: functions.userQuery,
    description: "Gives information about a user and their favorites",
  },
  {
    command: "anime",
    execute: functions.animeQuery,
    description: "Gives information about an anime",
  },
  {
    command: "manga",
    execute: functions.mangaQuery,
    description: "Gives information about a manga",
  },
  {
    command: "anime-c",
    execute: functions.animeCharactersQuery,
    description:
      "Lists maximum 5 of the most popular characters of the given anime (the character must be favorited by at least 300 people)",
  },
  {
    command: "manga-c",
    execute: functions.mangaCharactersQuery,
    description:
      "Lists maximum 5 of the most popular characters of the given manga (the character must be favorited by at least 300 people)",
  },
];

function help(message, args) {
  message.channel.send(commands.map((c) => `!${c.command}: ${c.description}`));
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
