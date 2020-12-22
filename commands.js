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

  const options = getOptions(queries.character_query, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayCharacterData(message, data))
    .catch((error) => displayErrorMessage(message, error));
};

exports.mediaQuery = (message, title, type) => {
  const variables = {
    title: title,
  };

  const query = type === "anime" ? queries.anime_query : queries.manga_query;
  const options = getOptions(query, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayMediaData(message, data))
    .catch((error) => displayErrorMessage(message, error));
};

function displayCharacterData(message, data) {
  const character_info = data.data.Character;
  const image_url = data.data.Character.image.large;

  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setAuthor(
      "AniList",
      "https://anilist.co/favicon.ico",
      "https://anilist.co/"
    )
    .setTitle(character_info.name.full)
    .setDescription(`Favorites: ${character_info.favourites}`)
    .setImage(image_url);

  message.channel.send(exampleEmbed);
}

function displayMediaData(message, data) {
  const mediaInfo = data.data.Media;
  const imageUrl = `${mediaUrl}/${mediaInfo.id}`;

  const exampleEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setAuthor(
      "AniList",
      "https://anilist.co/favicon.ico",
      "https://anilist.co/"
    )
    .setTitle(mediaInfo.title.romaji)
    .setImage(imageUrl);

  message.channel.send(exampleEmbed);
}

function displayErrorMessage(message, error) {
  message.channel.send(error.message);
}
