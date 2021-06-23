import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from "discord-akairo";
import { Intents } from "discord.js";
import { join } from "path";
import * as sqlite from 'sqlite3';
import { Prefix } from "../Config";
export const sqlite3 = sqlite.verbose();

export default class Client extends AkairoClient {
    commandHandler = new CommandHandler(this, {
        prefix: Prefix,
        directory: join(__dirname, "..", "commands"),
        commandUtil: true,
        commandUtilLifetime: 3e5,
        handleEdits: true,
        ignorePermissions: [], // PLACEHOLDER
        allowMention: true,
        blockBots: true,
        blockClient: true,
        ignoreCooldown: [], // also placeholder
        automateCategories: true,
    });

    listenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners")
    });

    inhibitorHandler = new InhibitorHandler(this, {
        directory: join(__dirname, "..", "inhibitors")
    });

    public constructor() {
        super({},
            {
                intents: Intents.ALL
            },
        )

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll()
        this.listenerHandler.setEmitters(
            {
                commandHandler: this.commandHandler,
                listenerHandler: this.listenerHandler,
            }
        )
    }
}