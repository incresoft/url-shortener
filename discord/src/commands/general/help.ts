import { Message, MessageEmbed } from "discord.js";
import { Discord } from "../..";

export default {
    name: "help",
    description: "The list of the bot commands",
    run: async (client: Discord, message: Message, args: string[]) => {

        const prefix = process.env.Prefix || "!";

        const help = new MessageEmbed()
        .setAuthor({
            name: client.user?.username + "'s Commands" as string, 
            iconURL: client.user?.displayAvatarURL() as string
        })
        .addField("🔗 Shorten", `${prefix}shorten <URL>`, true)
        .addField("⚙️ Edit", `${prefix}edit <code> <new url>`, true)
        .addField("_ _", "_ _", true)
        .addField("🗑️ Delete", `${prefix}delete <code>`, true)
        .addField("📄 URL", `${prefix}url <code> | all`, true)
        .addField("_ _", "_ _", true)
        .addField("📁 Commands", "ping, invite", false)
        .setThumbnail(String(message.author.displayAvatarURL({ dynamic: true, size: 2048})))
        .setColor("BLUE")
        .setTimestamp();

        return message.reply({
            embeds: [
                help
            ]
        })
    },
};