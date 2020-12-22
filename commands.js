const fetch = require("node-fetch");
const Discord = require("discord.js");
const queries = require("./queries.js");
const { handleResponse, getOptions } = require("./utils.js");

const apiUrl = "https://graphql.anilist.co";
const mediaUrl = "https://img.anili.st/media";

exports.characterQuery = (message, name) => {
  const variables = {
    name: name,
  };

  const options = getOptions(queries.characterQuery, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayCharacterData(message, data))
    .catch((error) => displayErrorMessage(message, error));
};

exports.mediaQuery = (message, title, type) => {
  const variables = {
    title: title,
  };

  const query = type === "anime" ? queries.animeQuery : queries.mangaQuery;
  const options = getOptions(query, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayMediaData(message, data))
    .catch((error) => displayErrorMessage(message, error));
};

function displayCharacterData(message, data) {
  const characterInfo = data.data.Character;
  const imageUrl = data.data.Character.image.large;

  const embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setAuthor(
      "AniList",
      "https://anilist.co/favicon.ico",
      "https://anilist.co/"
    )
    .setTitle(characterInfo.name.full)
    .setDescription(`Favorites: ${characterInfo.favourites}`)
    .setImage(imageUrl);

  message.channel.send(embed);
}

function displayMediaData(message, data) {
  const mediaInfo = data.data.Media;
  const imageUrl = `${mediaUrl}/${mediaInfo.id}`;

  const embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setAuthor(
      "AniList",
      "https://anilist.co/favicon.ico",
      "https://anilist.co/"
    )
    .setTitle(mediaInfo.title.romaji)
    .setImage(imageUrl);

  message.channel.send(embed);
}

function displayErrorMessage(message, error) {
  message.channel.send(error.message);
}
