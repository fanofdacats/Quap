import "dotenv/config";
//NEW 4/17
import {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SelectMenuBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  EmbedBuilder,
} from "discord.js";

import {
  DiscordRequest,
  GetCurrentGame,
  SaveCurrentGame,
  GetRoom,
} from "./utils.js";

import { MyGame } from "./game.js";

console.log("Loaded app.js");

//new change 4/17
//HAVE to ALSO change in the developer portal
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

export const ActiveGames = new Map();

let inventoryArray = [];

let money = 20.0;

let shoppingItems = [
  {
    name: "Tennisball",
    desc: "Its a tennisball, fresh in the package",
    price: 100.0,
  },
];

function getbent() {
  console.log("it made it to the canary");
  const helloText = "bitch ass ho";
  return helloText;
}

function eyesight(game) {
  const roomId = game.room;
  const currentRoom = GetRoom(roomId);
  const roomText = `__You are in **${currentRoom.name}**__ \n ${currentRoom.desc}`;
  return roomText;
}

function goToRoom(game, userId, roomId) {
  game.room = roomId;
  SaveCurrentGame(userId, game);
  return game;
}

function touchgrass(game) {
  const roomId = game.room;
  const currentRoom = GetRoom(roomId);

  let buttonRow = new ActionRowBuilder();

  for (let exit of currentRoom.exits) {
    let button = new ButtonBuilder();
    button.setCustomId("GO_" + exit.id);
    button.setLabel(exit.dir);
    button.setStyle(ButtonStyle.Primary);
    buttonRow.addComponents(button);
  }
  return buttonRow;
}

function sevenelevenbag(game) {
  const roomId = game.room;
  const currentRoom = GetRoom(roomId);
  const currentItems = inventoryArray.slice(0);

  let inventoryText = "";

  let inventoryEmbed = {
    title: "711 Bag",
    description: "You are fucking poor",
  };

  if (currentItems.length !== 0) {
    inventoryEmbed.description = "";
    for (let item of currentItems) {
      //new
      inventoryEmbed.description += `**${item.name}**: ${item.desc}`;
      inventoryEmbed.description += "\n";
    }
  }
  console.log("Current room is " + roomId);
  return inventoryEmbed;
}

function addToInventory(game, itemId) {
  const roomId = game.room;
  const currentRoom = GetRoom(roomId);
  const targetItem = currentRoom.items.find((item) => item.name === itemId);

  inventoryArray.push(targetItem);

  targetItem.count -= 1;

  if (targetItem.count === 0) {
    currentRoom.items = currentRoom.items.filter(
      (item) => item.name !== itemId
    );
  }
}

/*function canTheyUseThisItem(game, itemId) {
  const roomId = game.room;
  const currentRoom = GetRoom(roomId);
  let canUse = false;
  for (let item in inventoryArray) {
    if (item === itemId) canUse = true;
  }
  return canUse;
}*/

function yoink(game) {
  const roomId = game.room;
  const currentRoom = GetRoom(roomId);

  let buttonRowTake = new ActionRowBuilder();

  if (currentRoom.items.length === 0) {
    let button = new ButtonBuilder();
    button.setCustomId("no options left");
    button.setLabel("try something else");
    button.setStyle(ButtonStyle.Danger);
    buttonRowTake.addComponents(button);
  }

  for (let item of currentRoom.items) {
    let button = new ButtonBuilder();
    button.setCustomId("TAKE_" + item.name);
    button.setLabel(item.name);
    button.setStyle(ButtonStyle.Secondary);
    buttonRowTake.addComponents(button);
  }
  return buttonRowTake;
}

function useit(game) {
  const roomId = game.room;
  const currentRoom = GetRoom(roomId);
  
  let buttonRow = new ActionRowBuilder();

  let button = new ButtonBuilder;
  button.setCustomId("USE_" + "Yes");
  button.setLabel("Yes");
  button.setStyle(ButtonStyle.Primary);
  buttonRow.addComponents(button);

  let button2 = new ButtonBuilder;
  button2.setCustomId("USE_" + "No");
  button2.setLabel("No");
  button2.setStyle(ButtonStyle.Primary);
  buttonRow.addComponents(button2);

  return buttonRow;
}

client.on("error", console.error);
client.on("debug", console.info);

client.on("interactionCreate", async (interaction) => {
  console.log("command recieved");
  //Returns if it's not a command, logs it in the console
  if (!interaction.isCommand()) return;
  console.log("Command received: ", interaction);

  const { commandName, user } = interaction;
  const currentGame = GetCurrentGame(user.id);

  switch (commandName) {
    case "getbent":
      const helloText = "bitch ass ho";
      //Replies
      await interaction.reply({
        content: helloText,
      });
      break;
    case "useit":
      const useOptions = useit(currentGame);
      const userChoice = interaction.options.getString('name');
      const useText = "Do you want to use the " + userChoice + "?";
      await interaction.reply({
        content: useText,
        components: [useOptions],
      });
      break;
    case "eyesight":
      const roomText = eyesight(currentGame);
      await interaction.reply({
        content: roomText,
      });
      break;
    case "touchgrass":
      const currentDirections = touchgrass(currentGame);
      await interaction.reply({
        content: "touch grass where?",
        components: [currentDirections],
      });
      break;
    case "yoink":
      const currentItemsTake = yoink(currentGame);
      await interaction.reply({
        content: "steal what?",
        components: [currentItemsTake],
      });
      break;
    case "sevenelevenbag":
      const currentInventory = sevenelevenbag(currentGame);
      await interaction.reply({
        embeds: [currentInventory],
      });
      break;
  }
});

//Handles button interactions
client.on("interactionCreate", async (interaction) => {
  //if not a button, return
  if (!interaction.isButton()) return;
  console.log("Button received: ", interaction);

  const { customId, user } = interaction;
  const currentGame = GetCurrentGame(user.id);

  //for Go
  if (customId.startsWith("GO_")) {
    //remove 'GO_'
    await interaction.deferReply();
    const newRoomId = customId.slice(3);
    const updatedGame = goToRoom(currentGame, user.id, newRoomId);
    const roomText = eyesight(updatedGame);
    await interaction.editReply({
      content: roomText,
    });
  } 
  
  else if (customId.startsWith("TAKE_")) {
    await interaction.deferReply();
    const newItemId = customId.slice(5);
    const itemTextTook = `You took the ${newItemId}`;
    addToInventory(currentGame, newItemId);
    console.log("current inventory is" + inventoryArray);
    await interaction.editReply({
      content: itemTextTook,
    });
  } 
  
  else if (customId.startsWith("USE_")) {
    await interaction.deferReply();
    const useitId = customId.slice(4);
      if(customId.includes("Yes")) {
        const usedItText = "you chose to use the item";
        await interaction.editReply({
          content: usedItText,
        });
      }
      else{
        const usedItText2 = "you chose not to use it";
        await interaction.editReply({
          content: usedItText2,
        });
      } 
  } 
  
  else {
    await interaction.deferReply();
    await interaction.editReply({
      content: "hmmm not a valid room",
    });
  }
});

//new code
function shop(message) {
  if (message.content.toLowerCase() === "711") {
    const shopEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("711")
      .setDescription("Go get a slurpee, jackass")
      .addFields(
        { name: "shopEmbed", price: "Some value here" },
        { name: "\u200B", price: "\u200B" },
        { name: "Inline field title", price: "Some value here", inline: true },
        { name: "Inline field title", price: "Some value here", inline: true }
      )
      .addFields({
        name: "Inline field title",
        value: "Some value here",
        inline: true,
      })
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

    // Add each shop item to the embedded message
    shopEmbed.forEach((item) => {
      shopEmbed.addField(item.name, item.price);
    });

    // Send the embedded message to the channel
    return shopEmbed;
  }
}

client.once("ready", () => {
  console.log("app is ready to go");
});
client.login(process.env.BOT_TOKEN);
