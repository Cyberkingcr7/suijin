import { Client, Message } from "@open-wa/wa-automate";
import { Document } from "mongoose";
import MessageHandler from "../handler/Message";

export interface ICommand {
    id: string;
    path?: string;
    client?: Client;
    handler?: MessageHandler;
    categories?: ICategories;
    options: ICommandOptions;
    exec(msg: Message, args?: string[]): Promise<any> | any;
    parseArgs?(query: string[]): IParsedArgs;
}

export interface ICommandOptions {
    cooldown?: number;
    aliases: string[];
    category: string;
    description: ICommandDescription;
    meOnly?: boolean;
    devOnly?: boolean;
    adminOnly?: boolean;
    groupOnly?: boolean;
    privateOnly?: boolean;
}
export interface ICommandDescription {
    content: string;
    usage?: string;
}

export interface ICategories {
    name: string;
    path?: string;
    commands: ICommand[];
}
export interface IHandler {
    message?: MessageHandler;
}

export interface IParsedArgs {
    args: string[];
    flags: string[];
}

export interface IDefaultSettings extends Document {
    chatId: string;
    prefix: string;
    banlist: string[];
    cooldownBypass: boolean;
}

export interface IDeveloper extends Document {
    developer_id: string;
  }