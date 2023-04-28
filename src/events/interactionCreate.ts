import { Client, CommandInteraction } from "discord.js";
import { commands } from "../util/functions";

export default {
    name: "interactionCreate",
    once: false,
    execute: async function(client: Client, interaction: CommandInteraction) {
        if (!interaction.isCommand()) {
            return;
        }

        try {
            if (Object.keys(commands).includes(interaction.commandName)) {
                const module = require("../commands/" + interaction.commandName + ".js").default;
                module.run(client, interaction);
            }
        } catch(e) {
            console.log(e);
        }
    }
}