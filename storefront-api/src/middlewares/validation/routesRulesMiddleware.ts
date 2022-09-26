import { body, param } from "express-validator";

///////////// -------

export const userRules = [
  body("email") // < -- checking email 📏
    .exists()
    .withMessage("are not found")
    .isEmail()
    .withMessage("are not valid"),
  body("firstname") // < -- checking name 📐
    .exists()
    .withMessage("are not found")
    .isLength({ min: 4, max: 12 })
    .withMessage("must be a between 4 and 12"),
  body("lastname") // < -- checking name 📐
    .exists()
    .withMessage("are not found")
    .isLength({ min: 4, max: 12 })
    .withMessage("must be a between 4 and 12"),
  body("password")
    .exists()
    .withMessage("are not found")
    .isLength({ min: 6, max: 15 })
    .withMessage("must be a between 4 and 15"),
];

export const productRules = [
  body("name")
    .exists()
    .withMessage("is missing")
    .isLength({ min: 4, max: 50 })
    .withMessage("must be a between 4 and 50"),
  body("price").exists().withMessage("is missing").isNumeric().withMessage("must be a number"),
];

export const orderRules = [
  body("user_id").exists().withMessage("is not found").isNumeric().withMessage("must be a number"),
  body("is_complete").exists().withMessage("is not found").isBoolean().withMessage("must be a boolean value"),
];

export const orderProductRules = [
  body("productId").exists().withMessage("are not found").isNumeric().withMessage("must be a number"),
  body("quantity").exists().withMessage("are not found").isNumeric().withMessage("must be a number"),
];

export const emailPasswordRules = [
  body("email") // < -- checking email 📏
    .exists()
    .withMessage("are not found")
    .isEmail()
    .withMessage("are not valid"),
  body("password")
    .exists()
    .withMessage("are not found")
    .isLength({ min: 6, max: 15 })
    .withMessage("must be a between 4 and 15"),
];

export const idRules = [param("id").exists().withMessage("are not found").isNumeric().withMessage("must be a number")];
