import { Message } from "discord.js";
import { Discord } from "../..";

export default {
    name: "ping",
    description: "The ping of the bot in ms",
    run: (client: Discord, message: Message, args: string[]) => {
        return message.reply({
            embeds: [
                {
                    title: "Ping <:pink_heart:933364134936985600>",
                    description: `\`${Date.now() - message.createdTimestamp}ms\``,
                    color: "BLUE",
                    fields: [
                        {
                            name: "Want support?",
                            value: `Join our [**Discord**](${process.env.Discord_URL}) for getting support.`
                        }
                    ],
                    timestamp: Date.now()
                }
            ]
        });
    },
};