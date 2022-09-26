import { env } from "../config";

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT, PGTEST } = env;

export default {
  PGHOST,
  PGUSER,
  PGDATABASE: env.NODE_ENV === "test" ? PGTEST : PGDATABASE ,
  PGPASSWORD,
  PGPORT,
};
