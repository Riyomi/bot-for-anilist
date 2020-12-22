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
