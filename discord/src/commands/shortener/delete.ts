import { Message, MessageEmbed } from "discord.js";
import { Discord } from "../..";
import UserSchema from "#models/user";
import URLSchema from "#models/url";
import ShortId from "shortid";

export default {
    name: "delete",
    description: "Delete one of your url by code.",
    run: async (client: Discord, message: Message, args: string[]) => {

        const user = await UserSchema.findOne({ discord: message.author.id });

        if (!user) {
            return message.reply({
                embeds: [
                    {
                        title: "Delete",
                        description: `:x: ${message.author} You don't even have an account ¯\\_(ツ)_/¯\n➜ Use \`${process.env.Prefix || "!"}register\` to get started!`,
                        color: "RED"
                    }
                ]
            }).catch(() => {
                return;
            });
        };

        const Code = args[0];

        if (!Code) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Delete")
                        .setDescription(`:x: ${message.author} You need to provide the URL code.`)
                        .setColor("BLUE")
                        .addField("Forgot?", `Use \`${process.env.Prefix || "!"}url all\` to get a list of your URLs`)
                ]
            }).catch(() => {
                return;
            });;
        };

        const data = await URLSchema.findOne({ Code, Author: String(user._id) });

        if (!data) {
            return message.reply({
                embeds: [
                    {
                        title: "Delete",
                        description: `:x: ${message.author} The URL code is not valid.`,
                        color: "BLUE"
                    }
                ]
            });
        } else {
            await data.delete();

            return message.reply({
                embeds: [
                    {
                        title: "Delete",
                        description: `:white_check_mark: ${message.author} URL has been deleted successfully.`,
                        color: "BLUE"
                    }
                ]
            }).catch(() => {
                return;
            });
        };
    },
};