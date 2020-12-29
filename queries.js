exports.characterQuery = `
query ($name: String) {
  Character (search: $name) {
    name {
      full
    }
    image {
      large
    }
    favourites
  }
}
`;

exports.animeQuery = `
query ($title: String) {
  Media (search: $title, type: ANIME) {
    id
    title {
      romaji
    }
    coverImage {
      color
    }
  }
}
`;

exports.mangaQuery = `
query ($title: String) {
  Media (search: $title, type: MANGA) {
    id
    title {
      romaji
    }
    coverImage {
      color
    }
  }
}
`;

exports.userQuery = `
query ($name: String) {
  User(search: $name) {
    name
    avatar {
      medium
    }
    options {
      profileColor
    }
    statistics{
      anime {
        count
        meanScore
        episodesWatched
      }
      manga {
        count
        meanScore
        chaptersRead
      }
    }
  }
}
`;

exports.userFavesQuery = `
query ($name: String) {
  User(search: $name) {
    name
    avatar {
      medium
    }
    options {
      profileColor
    }
    favourites {
      anime(perPage: 5) {
        nodes {
          title {
            romaji
          }
        }
      }
      manga(perPage: 5) {
        nodes {
          title {
            romaji
          }
        }
      }
      characters(perPage: 5) {
        nodes {
          name {
            full
          }
        }
      }
    }
  }
}
`;

exports.animeCharactersQuery = `
query ($title: String, $numOfCharacters: Int) {
  Media(search: $title, type: ANIME) {
    title {
      romaji
    }
    characters(sort: FAVOURITES_DESC, perPage: $numOfCharacters) {
      nodes {
        name {
          full
        }
        image {
          medium
        }
        favourites
      }
    }
  }
}
`;

exports.mangaCharactersQuery = `
query ($title: String, $numOfCharacters: Int) {
  Media(search: $title, type: MANGA) {
    title {
      romaji
    }
    characters(sort: FAVOURITES_DESC, perPage: $numOfCharacters) {
      nodes {
        name {
          full
        }
        image {
          medium
        }
        favourites
      }
    }
  }
}
`;
