import { Message, MessageActionRow, MessageButton } from "discord.js";
import { Discord } from "../..";

export default {
    name: "invite",
    description: "Get the invite link of the bot",
    run: (client: Discord, message: Message, args: string[]) => {

        const clickHereButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Click Here")
                    .setStyle("LINK")
                    .setURL(process.env.Invite_URL as string)
            );

        return message.reply({
            embeds: [
                {
                    title: "Invite <:pink_heart:933364134936985600>",
                    description: `You can invite the by [**Click Here**](${process.env.Invite_URL}).`,
                    color: "BLUE",
                    fields: [
                        {
                            name: "Want support?",
                            value: `Join our [**Discord**](${process.env.Discord_URL}) for getting support.`
                        }
                    ]
                }
            ],
            components: [
                clickHereButton
            ]
        }).catch(() => {
            return;
        });
    },
};