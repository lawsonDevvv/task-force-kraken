import { Listener } from "discord-akairo";

export default class extends Listener {
    public constructor () {
        super("ready", {
            emitter: "client",
            event: "ready"
        });
    }

    public exec() {
        console.log(`User ${this.client.user.tag} logged in at ${new Date().toLocaleString()} EST.`)
    }
}