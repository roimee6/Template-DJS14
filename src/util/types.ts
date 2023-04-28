import { SlashCommandBuilder, CommandInteraction, Client } from "discord.js"

export interface SlashCommand {
    name: string
    builder: SlashCommandBuilder,
    
    run: (client: Client, interaction : CommandInteraction) => void,
}

export interface BotEvent {
    name: string,
    once?: boolean | false,

    execute: (client: Client, ...args: any[]) => void
}