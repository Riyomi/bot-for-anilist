exports.characterQuery = `
query ($name: String) {
  Character (search: $name) {
    name {
      full
      native
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
  }
}
`;

exports.userQuery = `
query ($name: String) {
  User(search: $name) {
    name
    bannerImage
    avatar {
      medium
    }
    favourites {
      anime {
        nodes {
          title {
            romaji
          }
        }
      }
      manga {
        nodes {
          title {
            romaji
          }
        }
      }
      characters {
        nodes {
          name {
            full
          },
          image {
            medium
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
