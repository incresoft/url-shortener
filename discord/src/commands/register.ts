import { Message } from "discord.js";
import { Discord } from "..";
import Schema from "#models/user";
import createUserId from "../utils/create-userId";
import { createToken, generatePassword }  from "../utils/create-token";

export default {
    name: "register",
    description: "Register for an account to use the service.",
    run: async (client: Discord, message: Message, args: string[]) => {

        const data = await Schema.findOne({ discord: message.author.id });
        const username = args[0];

        if (data) {
            return message.reply({
                embeds: [
                    {
                        title: "Register",
                        description: `:x: ${message.author} You are already registered.`,
                        color: "RED"
                    }
                ]
            }).catch(() => {
                return;
            });
        } else {

            if (!username) {
                return message.reply({
                    embeds: [
                        {
                            title: "Register",
                            description: `:x: ${message.author} You need to give a username`,
                            color: "RED"
                        }
                    ]
                }).catch(() => {
                    return;
                });
            };

            const regx = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/;

            if (regx.test(username) || username.length < 8 || username.length > 16) {
                return message.reply({
                      embeds: [
                          {
                              title: "Register",
                              description: `:x: ${message.author} **Username cannot**\n- have any **Number** or **Special Characters**\n- be less than **8 characters**.\n- more than **16 characters**.`,
                              color: "RED"
                          }
                      ]
                }).catch(() => {
                    return;
                });;
            };

            const userData = await Schema.findOne({ username });

            if (userData) {
                return message.reply({
                    embeds: [
                        {
                            title: "Register",
                            description: `:x: ${message.author} Username is already taken`
                        }
                    ]
                }).catch(() => {
                    return;
                });;
            };

            const _id = await createUserId();

            const user = new Schema({
                _id,
                username: String(message.author.username).toLowerCase(),
                password: generatePassword(),
                discord: String(message.author.id),
                token: createToken()
            });

            await user.save();

            return message.reply({
                embeds: [
                    {
                        title: "Register",
                        description: `:white_check_mark: ${message.author} has been registered successfully.\n➜ Use \`${process.env.Prefix || "!"}credentials\` to get password.`,
                        color: "GREEN"
                    }
                ]
            }).catch(() => {
                return;
            });
        };
    },
};