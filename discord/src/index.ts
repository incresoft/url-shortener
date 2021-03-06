import { Client, Collection, GuildMember } from "discord.js";
import mongoose from "mongoose";
import { config } from "dotenv";

config();
export class Discord extends Client {
    public cache: Collection<string, any>;

    constructor () {
        super({
            intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
            allowedMentions: {
                parse: ["everyone"]
            },
            shards: "auto"
        });

        this.cache = new Collection();
    };
};

const client = new Discord();

["Command"].forEach(dir => {
    require(`./handlers/${dir}`).default(client);
});

(async () => {

    mongoose.connection.on("open", () => {
        console.log("Database is connected");
    });

    mongoose.connection.on("close", () => {
        console.log("Database is disconnected");
    });

    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.Mongodb as string, {
            keepAlive: true,
            connectTimeoutMS: 0,
            socketTimeoutMS: 0,
            serverSelectionTimeoutMS: 0
        });
    };

})();

client.on("ready", () => {
    console.log("Client is ready");
});

client.on("messageCreate", async (message) => {

    const prefix = process.env.Prefix || "!";
    
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.channel.type === "DM") return;
    if (!message.channel.permissionsFor(message.guild?.me as GuildMember).has("SEND_MESSAGES")) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = client.cache.get(`commands-${args.shift()?.toLowerCase()}`);

    if (command) {
        command.run(client, message, args);
    };
});

client.login(process.env.Discord_Token);