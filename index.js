const Discord = require("discord.js");
const { token } = require("./config.json");
const {
  characterQuery,
  mediaQuery,
  mediaCharactersQuery,
} = require("./commands");
const { getArgs, getCommand } = require("./utils");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  const args = getArgs(message);
  const command = getCommand(args);
  const rest = args.slice(args.indexOf(" ")).trim().toLowerCase();

  if (command === "character") {
    characterQuery(message, rest);
  } else if (command === "anime") {
    mediaQuery(message, rest, "anime");
  } else if (command === "manga") {
    mediaQuery(message, rest, "manga");
  } else if (command === "anime-c") {
    mediaCharactersQuery(message, rest, "anime");
  } else if (command === "manga-c") {
    mediaCharactersQuery(message, rest, "manga");
  } else if (command === "anime-r") {
    mediaCharactersQuery(message, rest, "manga");
  } else if (command === "manga-r") {
    mediaCharactersQuery(message, rest, "manga");
  }
});

client.login(token);
