import { Client } from "@open-wa/wa-automate";
import { connect, Connection } from "mongoose";
import { settings, developer } from "../models/index";

export class DatabaseHandler {
  public connected = false;
  public connection: Connection | undefined;
  public models = { settings, developer };

  public constructor(public readonly client: Client) {}

  public async connect(): Promise<void> {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      this.client.log.error("MONGODB_URI is missing, please fill the value!");
      process.exit(1);
    }
    
    try {
      const { connection } = await connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
      connection.once("open", () => this.client.log.info("Database connection opened!"));
      connection.on("connected", () => this.client.log.info("Database connected!"));
      connection.on("error", (error) => this.client.log.error(error));
      
      this.connection = connection;
      this.connected = true;
    } catch (e) {
      this.client.log.error(e);

      this.connection = undefined;
      this.connected = false;
    }
  }
}
