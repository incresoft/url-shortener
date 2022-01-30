import { Discord } from "..";
import glob from "glob";
import path from "path";

export default function (client: Discord) {

    const files = glob.sync("./build/commands/**/**/*.js");

    for (let i = 0; i < files.length; i++) {
        const file = require(path.resolve(files[i])).default;

        if (file.name) {
            client.cache.set(`commands-${file.name}`, file);
        };
    };
};