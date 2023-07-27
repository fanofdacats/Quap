import "dotenv/config";
import fetch from "node-fetch";
import { MyGame } from "./game.js";
import { ActiveGames } from "./app.js";

/* GetCurrentGame fetches the current game from ActiveGames
If none exists, then it creates a new game */
export function GetCurrentGame(userId) {
  let currentGame;
  if (ActiveGames.has(userId)) {
    //Fetches current userId if a game exists
    currentGame = ActiveGames.get(userId);
  } else {
    //Starts a new game for user
    currentGame = {
      room: MyGame.roomId,
      inventory: [],
    };
    SaveCurrentGame(userId, currentGame);
  }
  return currentGame;
}

//Saves new state of game to ActiveGames
export function SaveCurrentGame(userId, game) {
  //Set userId to the game object
  ActiveGames.set(userId, game);
}

//Deletes a game
export function StopGame(userId) {
  ActiveGames.delete(userId);
}

//returns a room's ID
export function GetRoom(roomId) {
  return MyGame.rooms.find((room) => room.id === roomId);
}

// This function makes REST API calls using https://www.npmjs.com/package/node-fetch
// It prepends the API URL, so you just have to pass in the endpoint URL
// Payloads will go in the "body" field
export async function DiscordRequest(endpoint, options) {
  const baseURL = "https://discord.com/api/v10";

  //This looks for the '/' at the beginning of the endpoint; if it doesn't exist, it adds it.
  const fEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  //Appends endpoint to base API URL
  const url = baseURL + fEndpoint;

  //Converts JS value into a string
  if (options.body) options.body = JSON.stringify(options.body);

  //Use node-fetch to make requests
  //JS note: `${var}` lets us create strings with variables contained in them
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  });

  //Throws API errors if encountering one
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }

  //Returns original response
  return res;
}
