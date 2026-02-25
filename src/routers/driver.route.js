import express from "express";
import * as driverController from "../modules/driver.module.js";

const router = express.Router();

router.post("/register-driver", driverController.registerDriver);
router.get("/get-drivers", driverController.getDrivers);

export default router;