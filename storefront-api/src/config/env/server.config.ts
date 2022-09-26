import { env } from "../config";

const { PORT, HOST } = env;

export default {
  PORT: PORT || 8080,
  HOST,
};
