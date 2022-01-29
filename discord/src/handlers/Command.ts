import { Discord } from "..";
import fs from "fs";

export default function (client: Discord) {

    const files = fs.readdirSync(process.cwd() + "/build/commands/").filter(x => x.endsWith(".js"));

    for (let i = 0; i < files.length; i++) {
        const file = require(`../commands/${files[i]}`).default;

        if (file.name) {
            client.cache.set(`commands-${file.name}`, file);
        };
    };
};