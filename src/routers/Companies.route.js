import express from "express";
import * as CompaniesController from "../modules/Companies.module.js";

const router = express.Router();

router.post("/register-company", CompaniesController.registerCompany);
router.get("/get-companies", CompaniesController.getCompanies);
router.put("/update-company/:id", CompaniesController.updateCompany);

export default router;