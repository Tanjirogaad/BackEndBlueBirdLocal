import { Router } from "express";
import * as employeeController from "../modules/employee.module.js";

const router = Router();

router.post("/register-employee", employeeController.registerEmployee);
router.post("/login", employeeController.login);
router.get("/profile", employeeController.getProfile);
router.post("/refresh-token", employeeController.refreshToken);
router.post("/logout", employeeController.logout);
router.patch("/forgot-password", employeeController.forgotPassword);
router.patch("/change-password", employeeController.changePassword);


export default router;
