import { Client } from "discord.js";
import { load } from "./util/functions";

import { TOKEN, GUILD_ID, CLIENT_ID } from "./config.json";

export var options = {
    guild_id: GUILD_ID,
    client_id: CLIENT_ID,
    token: TOKEN,
};

const client = new Client({
    intents: 25767 // ALL INTENTS (BUT YOU CAN CHOOSE UR OWN INTENTS)
});

load(client);

client.login(options.token);