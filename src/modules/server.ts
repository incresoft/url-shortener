import express, { Application } from "express";

import path from "path";
import fs from "fs";

class Server {
    public app: Application;

    constructor () {
        this.app = express();

        this.setMiddleware();
        this.setRoutes();
    };

    public setMiddleware (): void {
        this.app.use(express.json());
    };
    
    public setRoutes () {
        const files = fs.readdirSync(`${process.cwd()}/build/routes`).filter(x => x.endsWith(".js"));

        for (let i = 0; i < files.length; i++) {
            const filename = files[i].replace(".js", "");
            const routepath = (filename === "index") ? "/" : `/${filename}`;

            try {
                this.app.use(routepath, require(`../routes/${filename}`).default);
            } catch {};
        };
    };

    public async init (port: string | number) {
        return this.app.listen(port, () => {
            console.log("App is ready");
        });
    };
};


new Server().init(process.env.PORT || 3000);