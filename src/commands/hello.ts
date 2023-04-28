import { Client, SlashCommandBuilder, CommandInteraction } from "discord.js";

export default {
    name: "hello",
    builder: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Hello command"),
    run: async function(client: Client, interaction: CommandInteraction) {
        interaction.reply("Hey !");
    }
}