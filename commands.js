import "dotenv/config";

import { DiscordRequest } from "./utils.js";

//NEWWWWW
import { ButtonStyle } from "discord.js";
import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";

/*const HELLO_COMMAND = {
  name: "getbent",
  description: "Hold my L, ya moron",
  type: ApplicationCommandType.ChatInput,
};*/

const LOOK_COMMAND = {
  name: "eyesight",
  description: "Use ya damn peepers",
  type: ApplicationCommandType.ChatInput,
};

const USE_COMMAND = {
  name: "useit",
  description: "Use that item!",
   options: [
        {
            name: "name",
            description: "The type of animal",
            type: 3,
            required: true,
        },
    ],
  type: ApplicationCommandType.ChatInput,
};

const ITEMSHOP_COMMAND = {
  name: "seveneleven",
  description: "Go to the 7/11 and get some shit",
  type: ApplicationCommandType.ChatInput,
};

const GO_COMMAND = {
  name: "touchgrass",
  description: "Get your lazy ass out of your chair and touch grass",
  type: ApplicationCommandType.ChatInput,
};

const TAKE_COMMAND = {
  name: "yoink",
  description: "grasp the items with ya meat sticks",
  type: ApplicationCommandType.ChatInput,
};

const INVENTORY_COMMAND = {
  name: "sevenelevenbag",
  description: "peer into the 7 eleven bag",
  type: ApplicationCommandType.ChatInput,
};

async function installCommands(...commands) {
  const installCommandEndpoint = `/applications/${process.env.APP_ID}/commands`;

    //install command
    try {
      await DiscordRequest(installCommandEndpoint, {
        method: "PUT",
        body: (commands),
      });
    } catch (err) {
      console.error("Error installing command: ", err);
    }
}

installCommands(
  LOOK_COMMAND,
  GO_COMMAND,
  TAKE_COMMAND,
  INVENTORY_COMMAND,
  ITEMSHOP_COMMAND,
  USE_COMMAND
);
