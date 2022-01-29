import { Message } from "discord.js";
import { Discord } from "..";
import Schema from "#models/user";
import SchemaURL from "#models/url";
import Validator from "validator";
import ShortId from "shortid";

export default {
    name: "shorten",
    description: "Shorten your url directly from Discord.",
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
        };

        const url = args.join(" ");

        if (!url) {
            return message.reply({
                embeds: [
                    {
                        title: "Shorten",
                        description: `:x: ${message.author} You need to give the URL.\n➜ \`${process.env.Prefix || "!"}shorten <URL>\``,
                        color: "RED"
                    }
                ]
            }).catch(() => {
                return;
            });
        };

        if (!Validator.isURL(url)) {
            return message.reply({
                embeds: [
                    {
                        title: "Shorten",
                        description: `:x: ${message.author} The URL is not valid\n➜ Try again!`,
                        color: "RED"
                    }
                ]
            }).catch(() => {
                return;
            });
        };

        const Code = ShortId.generate();
        const makeURL = new SchemaURL({
            _id: message.author.id,
            Redirect: String(url),
            Code
        });

        await makeURL.save();

        return message.reply({
            embeds: [
                {
                    title: "Shorten",
                    description: `:white_check_mark: ${message.author} Your link has been shortened.\n➜ **${process.env.Website_URL}/${Code}**`,
                    color: "BLUE"
                }
            ]
        }).catch(() => {
            return;
        });
    },
};