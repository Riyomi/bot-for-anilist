const fetch = require("node-fetch");
const Discord = require("discord.js");
const queries = require("./queries");
const { handleResponse, getOptions } = require("./utils");

const apiUrl = "https://graphql.anilist.co";
const mediaUrl = "https://img.anili.st/media";
const minFavesToDisplayChar = 300;

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

exports.userQuery = (message, name) => {
  const variables = {
    name: name,
  };

  console.log(name);
  const options = getOptions(queries.userQuery, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayUserData(message, data))
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

exports.animeQuery = (message, title) =>
  this.mediaQuery(message, title, "anime");

exports.mangaQuery = (message, title) =>
  this.mediaQuery(message, title, "manga");

exports.animeCharactersQuery = (message, title, numOfCharacters = 5) =>
  this.mediaCharactersQuery(message, title, "anime", numOfCharacters);

exports.mangaCharactersQuery = (message, title, numOfCharacters = 5) =>
  this.mediaCharactersQuery(message, title, "manga", numOfCharacters);

exports.mediaCharactersQuery = (message, title, type, numOfCharacters) => {
  const variables = {
    title: title,
    numOfCharacters: numOfCharacters,
  };

  const query =
    type === "anime"
      ? queries.animeCharactersQuery
      : queries.mangaCharactersQuery;
  const options = getOptions(query, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayMediaCharactersData(message, data))
    .catch((error) => displayErrorMessage(message, error));
};

const displayCharacterData = (message, data) => {
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
};

const displayUserData = (message, data) => {
  const userInfo = data.data.User;
  const avatarUrl = userInfo.avatar.medium;
  const favoriteAnime = userInfo.favourites.anime.nodes.slice(0, 5);
  const favoriteManga = userInfo.favourites.manga.nodes.slice(0, 5);
  const favoriteCharacters = userInfo.favourites.characters.nodes.slice(0, 5);

  const embed = new Discord.MessageEmbed()
    .setAuthor(
      "AniList",
      "https://anilist.co/favicon.ico",
      "https://anilist.co/"
    )
    .setTitle(userInfo.name)
    .setThumbnail(avatarUrl);

  if (favoriteAnime.length > 0) {
    embed.addField(
      "Favorite anime",
      favoriteAnime.map((anime) => anime.title.romaji)
    );
  }
  if (favoriteManga.length > 0) {
    embed.addField(
      "Favorite manga",
      favoriteManga.map((manga) => manga.title.romaji),
      true
    );
  }
  if (favoriteCharacters.length > 0) {
    embed.addField(
      "Favorite characters",
      favoriteCharacters.map((characters) => characters.name.full),
      true
    );
  }

  message.channel.send(embed);
};

const displayMediaData = (message, data) => {
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
};

const displayMediaCharactersData = (message, data) => {
  const title = data.data.Media.title.romaji;
  const characters = data.data.Media.characters.nodes;

  const embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setAuthor(
      "AniList",
      "https://anilist.co/favicon.ico",
      "https://anilist.co/"
    )
    .setTitle(title)
    .addFields(
      characters.map((character) => {
        return {
          name: character.name.full,
          value: character.favourites,
          inline: true,
        };
      })
    );
  var embeds = [];
  characters.map((character) => {
    if (character.favourites >= minFavesToDisplayChar)
      embeds.push(
        new Discord.MessageEmbed()
          .setTitle(character.name.full)
          .setDescription(`Favorites: ${character.favourites}`)
          .setImage(character.image.medium)
      );
  });

  embeds.forEach((embed) => {
    message.channel.send(embed);
  });
};

const displayErrorMessage = (message, error) => {
  message.channel.send(
    error.errors[0] ? error.errors[0].message : "An error occured"
  );
};
