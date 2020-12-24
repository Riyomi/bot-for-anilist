const Discord = require("discord.js");
const { token } = require("./config.json");
const {
  characterQuery,
  userQuery,
  mediaQuery,
  mediaCharactersQuery,
} = require("./commands");
const { parseArgs } = require("./utils");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  const { command, args } = parseArgs(message);

  switch (command) {
    case "character":
      characterQuery(message, args);
      break;
    case "anime":
      mediaQuery(message, args, "anime");
      break;
    case "manga":
      mediaQuery(message, args, "manga");
      break;
    case "user":
      userQuery(message, args);
      break;
    case "anime-c":
      mediaCharactersQuery(message, args, "anime");
      break;
    case "manga-c":
      mediaCharactersQuery(message, args, "manga");
      break;
  }
});

client.login(token);
