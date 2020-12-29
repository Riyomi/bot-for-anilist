const fetch = require("node-fetch");
const Discord = require("discord.js");
const queries = require("./queries");
const { handleResponse, getOptions } = require("./utils");
const _ = require("lodash");

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

  const options = getOptions(queries.userQuery, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayUserData(message, data))
    .catch((error) => displayErrorMessage(message, error));
};

exports.userFavesQuery = (message, name) => {
  const variables = {
    name: name,
  };

  const options = getOptions(queries.userFavesQuery, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayUserFaves(message, data))
    .catch((error) => displayErrorMessage(message, error));
};

/* Media queries */

exports.animeQuery = (message, title) =>
  this.mediaQuery(message, title, queries.animeQuery);

exports.mangaQuery = (message, title) =>
  this.mediaQuery(message, title, queries.mangaQuery);

exports.mediaQuery = (message, title, query) => {
  const variables = {
    title: title,
  };

  const options = getOptions(query, variables);

  fetch(apiUrl, options)
    .then(handleResponse)
    .then((data) => displayMediaData(message, data))
    .catch((error) => displayErrorMessage(message, error));
};

/* Media character queries */

exports.animeCharactersQuery = (message, title, numOfCharacters = 5) =>
  this.mediaCharactersQuery(
    message,
    title,
    queries.animeCharactersQuery,
    numOfCharacters
  );

exports.mangaCharactersQuery = (message, title, numOfCharacters = 5) =>
  this.mediaCharactersQuery(
    message,
    title,
    queries.mangaCharactersQuery,
    numOfCharacters
  );

exports.mediaCharactersQuery = (message, title, query, numOfCharacters) => {
  const variables = {
    title: title,
    numOfCharacters: numOfCharacters,
  };

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

const displayUserFaves = (message, data) => {
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
      favoriteAnime.map((anime) => _.truncate(anime.title.romaji))
    );
  }
  if (favoriteManga.length > 0) {
    embed.addField(
      "Favorite manga",
      favoriteManga.map((manga) => _.truncate(manga.title.romaji)),
      true
    );
  }
  if (favoriteCharacters.length > 0) {
    embed.addField(
      "Favorite characters",
      favoriteCharacters.map((character) => character.name.full),
      true
    );
  }
  message.channel.send(embed);
};

const displayUserData = (message, data) => {
  const userInfo = data.data.User;
  const avatarUrl = userInfo.avatar.medium;

  const embed = new Discord.MessageEmbed()
    .setAuthor(
      "AniList",
      "https://anilist.co/favicon.ico",
      "https://anilist.co/"
    )
    .setTitle(userInfo.name)
    .setThumbnail(avatarUrl)
    .addField(
      "Anime statistics",
      `Total anime: ${userInfo.statistics.anime.count}\nMean score: ${userInfo.statistics.anime.meanScore}\nEpisodes: ${userInfo.statistics.anime.episodesWatched}`,
      true
    )
    .addField(
      "Manga statistics",
      `Total manga: ${userInfo.statistics.manga.count}\nMean score: ${userInfo.statistics.manga.meanScore}\nChapters: ${userInfo.statistics.manga.chaptersRead}`,
      true
    );

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
  const characters = data.data.Media.characters.nodes;

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

  embeds.forEach((embed) => message.channel.send(embed));
};

const displayErrorMessage = (message, error) => {
  message.channel.send(
    error.errors[0] ? error.errors[0].message : "An error occured"
  );
};
