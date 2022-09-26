import { authentication } from "./authenticationMiddleware";
import { authorization } from "./authorizationMiddleware";

export const auth = [authentication, authorization];
