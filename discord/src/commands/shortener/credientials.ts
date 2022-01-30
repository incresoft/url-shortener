import { Message } from "discord.js";
import { Discord } from "../../../build";
import Schema from "#models/user";

export default {
    name: "credentials",
    description: "Get your username and password for site login.",
    run: async (client: Discord, message: Message, args: string[]) => {

        const data = await Schema.findOne({ discord: message.author.id });

        if (!data) {
            return message.reply({
                embeds: [
                    {
                        title: "Shorten",
                        description: `:x: ${message.author} You have to register first.\n➜ Use \`${process.env.Prefix || "!"}register\` to get started!`,
                        color: "RED"
                    }
                ]
            }).catch(() => {
                return;
            });
        } else {

            return message.author.send({
                embeds: [
                    {
                        title: "🔑 Credentials",
                        description: "Here are your credentials for the website.",
                        color: "BLUE",
                        fields: [
                            {
                                name: "Username",
                                value: String(data.username),
                                inline: true
                            },
                            {
                                name: "Password",
                                value: "||" + String(data.password) + "||",
                                inline: true
                            },
                            {
                                name: "API Key",
                                value: "||" + String(data.token) + "||",
                                inline: false
                            },
                            {
                                name: "Website",
                                value: "Not launched yet...",
                                inline: false
                            }
                        ],
                        timestamp: Date.now()
                    }
                ]
            }).then(() => {
                return message.reply({
                    content: ":white_check_mark: Your credentials have been sent to your DMs."
                }).catch(() => {
                    return;
                });
            }).catch(() => {
                return message.reply({
                    content: ":x: Please open your DMs first."
                }).catch(() => {
                    return;
                });
            });
        };
    },
};