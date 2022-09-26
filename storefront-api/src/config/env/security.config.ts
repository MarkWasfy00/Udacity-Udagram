import { env } from "../config";

const { JWT_TOKEN, PEPPER } = env;

export default {
  JWT_TOKEN,
  PEPPER,
};
