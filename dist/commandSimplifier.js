"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class CommandCollector {
    postCommands(botId, botToken) {
        return new Promise((resolve, reject) => {
            const id = botId;
            console.log(id);
            const rest = new discord_js_1.REST({ version: "10" }).setToken(botToken);
            rest.put(discord_js_1.Routes.applicationCommands(id), { body: this.commands }).then((_) => resolve(`Success at url: ${discord_js_1.Routes.applicationCommands(id)}`))
                .catch((error) => reject("there was an error :/ " + error));
        });
    }
    addCommand(command, post, botId, botToken) {
        const id = botId ? botId : "";
        const token = botToken ? botToken : "";
        if (post && id === "" && token === "")
            throw new Error("Bot id must be specified before posting.");
        this.commands.push(command);
        if (post)
            this.postCommands(id, token);
    }
    constructor(commands, client, extraCodeWithInteraction) {
        this.commands = commands;
        this.client = client;
        if (extraCodeWithInteraction)
            extraCodeWithInteraction();
    }
    waitForCommands(botToken) {
        this.client.removeAllListeners("interactionCreate");
        this.client.on("interactionCreate", (interaction) => {
            if (interaction.isCommand) {
                const command = this.commands.find(c => interaction.commandName == c.name);
                if (command)
                    return command.run(interaction);
                console.log("Command not found.");
            }
            if (this.extraCodeWhenInteraction)
                this.extraCodeWhenInteraction(interaction);
        });
        this.client.login(botToken);
    }
}
exports.default = CommandCollector;
