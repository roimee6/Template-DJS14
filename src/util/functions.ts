import { readdirSync } from "fs";

import { Client } from "discord.js";
import { BotEvent, SlashCommand } from "./types";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { join } from "path";
import { options } from "../main";

export let commands: any = [];

export async function load(client: Client) {
    let eventsDir = join(__dirname, "../events")
    let commandsDir = join(__dirname, "../commands")

    for (const file of readdirSync(eventsDir)) {
        if (!file.endsWith(".js")) {
            return;
        }

        let event: BotEvent = require(`${eventsDir}/${file}`).default;
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args))
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args))
        }
    }

    for (const file of readdirSync(commandsDir)) {
        if (!file.endsWith(".js")) {
            return;
        }

        const module: SlashCommand = require(`${commandsDir}/${file}`).default;
        const command = module.builder.toJSON();

        commands[module.name] = command;
    }

    const rest = new REST({ version: "9" }).setToken(options.token);

    await rest.put(
        Routes.applicationGuildCommands(options.client_id, options.guild_id),
        { body: Object.values(commands) }
    );
}