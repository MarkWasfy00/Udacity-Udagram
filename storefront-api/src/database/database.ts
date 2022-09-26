import { Pool } from "pg";
import databaseConfig from "../config/env/database.config";

const databaseVaraibles = {
  host: databaseConfig.PGHOST,
  database: databaseConfig.PGDATABASE,
  user: databaseConfig.PGUSER,
  password: databaseConfig.PGPASSWORD,
  port: parseInt(databaseConfig.PGPORT as string),
};

export const db = new Pool(databaseVaraibles);
