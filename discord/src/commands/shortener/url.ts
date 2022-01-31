import UserSchema from "#models/user";
import URLSchema from "#models/url";
import { Message, MessageEmbed } from "discord.js";
import { Discord } from "../..";

import moment from "moment";

export default {
    name: "url",
    description: "Get to know about your links.",
    run: async (client: Discord, message: Message, args: string[]) => {

        const user = await UserSchema.findOne({ discord: String(message.author.id) });
        const input = (args[0]) ? args[0].toLowerCase() : args[0];

        if (!user) {
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

        switch (input) {
            case "all": {
                const urls = await getURLs(user.Author);

                const embed = new MessageEmbed()
                    .setTitle("🔗 URLs")
                    .setColor("BLUE")
                    .setDescription(`${message.author} ${(urls.length) ? `Here are your links:\n${urls.join("\n")}` : "You don't have any URL."}`)
                    .setFooter({
                        text: String(message.author.username),
                        iconURL: String(message.author.displayAvatarURL({ dynamic: true }))
                    });

                    return message.reply({
                        embeds: [embed]
                    }).catch(() => {
                        return;
                    });
            };

            break;

            default: {

                if (!input) {
                    return message.reply({
                        embeds: [
                            {
                                title: "🔗 URLs",
                                description: `:x: ${message.author} You need to give the URL code\n➜ Try \`${process.env.Prefix || "!"}url all\` for URLs list.`,
                                color: "RED"
                            }
                        ]
                    }).catch(() => {
                        return;
                    });
                };

                const url = await URLSchema.findOne({ discord: String(message.author.id), Code: String(input) });

                if (!url) {
                    return message.reply({
                        embeds: [
                            {
                                title: "🔗 URLs",
                                description: `:x: ${message.author} The URL code is not valid.`,
                                color: "RED"
                            }
                        ]
                    }).catch(() => {
                        return;
                    });
                };

                return message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle("🔗 URL")
                            .setDescription(`➜ ${message.author} Here is some information about your URL.`)
                            .setColor("BLUE")
                            .addField("🗒️ Code", `➜ ${url.Code}`, true)
                            .addField("⚙️ Created at", `➜ ${moment(url.createdAt).format("Do MMM, YYYY LT")}`, true)
                            .addField("💻 Author", `➜ ${user.username}`, false)
                            .addField("🌐 Link", `${process.env.Website_URL}/${url.Code}`, false)
                    ]
                }).catch(() => {
                    return;
                });
            };
        };
    },
};

async function getURLs (userId): Promise<string[]> {

    const urls = URLSchema.find({ Author: userId });
    const array: string[] = [];
    
    return new Promise(async (resolve, reject) => {
        urls.exec((err, data) => {
            let i = 0;

            if (!data) {
                return resolve(array);
            };

            data.forEach(x => {
                i++
                array.push(`➜ ${i}. ${process.env.Website_URL}/${x.Code}`)
            })

            return resolve(array);
        });
    });
};