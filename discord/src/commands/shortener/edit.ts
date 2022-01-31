import UserSchema from "#models/user";
import URLSchema from "#models/url";
import { Message } from "discord.js";
import { Discord } from "../..";

export default {
    name: "edit",
    description: "Edit your url code with a custom one.",
    run: async (client: Discord, message: Message, args: string[]) => {
        
        const user = await UserSchema.findOne({ discord: message.author.id });
        const Code = args[0];

        if (!user) {
            return message.reply({
                embeds: [
                    {
                        title: "Edit",
                        description: `:x: ${message.author} You have to register first.\n➜ Use \`${process.env.Prefix || "!"}register\` to get started!`,
                        color: "RED"
                    }
                ]
            }).catch(() => {
                return;
            });
        };

        if (!Code) {
            return message.reply({
                embeds: [
                    {
                        title: "Edit",
                        description: `:x: ${message.author} You need to give the URL code`,
                        color: "RED"
                    }
                ]
            });
        } else {
            args.shift();
        };

        const url = await URLSchema.findOne({ discord: String(message.author.id), Code });

        if (!url) {
            return message.reply({
                embeds: [
                    {
                        title: "Edit",
                        description: `:x: ${message.author} The URL code is not valid`,
                        color: "RED"
                    }
                ]
            });
        };

        const newCode = args[0];

        if (!newCode) {
            return message.reply({
                embeds: [
                    {
                        title: "Edit",
                        description: `:x: ${message.author} You have to give the new URL code to edit.`,
                        color: "RED"
                    }
                ]
            });
        };

        const checkCode = await URLSchema.findOne({ Code: String(newCode) });

        if (checkCode) {
            return message.reply({
                embeds: [
                    {
                        title: "Edit",
                        description: `:x: ${message.author} The URL code is not available.`,
                        color: "RED"
                    }
                ]
            });
        };

        url["Code"] = String(newCode);
        await url.save();

        return message.reply({
            embeds: [
                {
                    title: "Edit",
                    description: `:white_check_mark: ${message.author} The URL code has been updated.\n➜ ${process.env.Website_URL}/${newCode}`,
                    color: "BLUE"
                }
            ]
        });
    },
};