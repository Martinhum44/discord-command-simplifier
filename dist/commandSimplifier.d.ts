import { Client, ApplicationCommandOptionType } from "discord.js";
type Option = {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required: boolean;
};
type Command = {
    run: (interaction: any) => void;
    options?: Option[];
    name: string;
    description: string;
};
declare class CommandCollector {
    commands: Command[];
    client: Client;
    extraCodeWhenInteraction?: (interaction: any) => void;
    postCommands(botId: string, botToken: string): Promise<unknown>;
    addCommand(command: Command, post?: boolean, botId?: string, botToken?: string): void;
    constructor(commands: Command[], client: Client, extraCodeWithInteraction?: () => void);
    waitForCommands(botToken: string): void;
}
export default CommandCollector;
