exports.character_query = `
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

exports.anime_query = `
query ($title: String) {
  Media (search: $title, type: ANIME) {
    id
    title {
      romaji
    }
  }
}
`;

exports.manga_query = `
query ($title: String) {
  Media (search: $title, type: MANGA) {
    id
    title {
      romaji
    }
  }
}
`;
