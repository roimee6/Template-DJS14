import { Client } from "discord.js";

export default {
    name: "ready",
    once: true,
    execute: async function(client: Client) {
        console.log(`Logged in as ${client.user?.tag} !`);
    }
}