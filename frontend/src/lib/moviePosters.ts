const MOVIE_POSTERS: Record<string, string> = {
  "captain america civil war": "/posters/captain-america-civil-war.jpg",
  "captain america": "/posters/captain-america.jpg",
  "captain america the first avenger": "/posters/captain-america.jpg",
  doomsday: "/posters/doomsday.jpg",
  "avengers doomsday": "/posters/doomsday.jpg",
  "iron man": "/posters/iron-man.jpg",
  "the avengers end game": "/posters/the-avengers-end-game.jpg",
  "avengers endgame": "/posters/the-avengers-end-game.jpg",
  "the avengers endgame": "/posters/the-avengers-end-game.jpg",
  "the avengers infinity war": "/posters/the-avengers-infinity-war.jpg",
  "avengers infinity war": "/posters/the-avengers-infinity-war.jpg",
  "the avengers": "/posters/the-avengers.jpg",
  avengers: "/posters/the-avengers.jpg",
  thor: "/posters/thor.jpg",
};

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getMoviePoster(title: string): string | null {
  const key = normalizeTitle(title);
  if (MOVIE_POSTERS[key]) {
    return MOVIE_POSTERS[key];
  }

  for (const [posterKey, posterPath] of Object.entries(MOVIE_POSTERS)) {
    if (key.includes(posterKey) || posterKey.includes(key)) {
      return posterPath;
    }
  }

  return null;
}
