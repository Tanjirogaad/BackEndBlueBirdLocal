import express from "express";
import "dotenv/config"
import cors from "cors";
import { connectDB } from "./src/DB/connectDB.js";
import employeeRouter from "./src/routers/employee.route.js";
import driverRouter from "./src/routers/driver.route.js";
import CompaniesRouter from "./src/routers/Companies.route.js";
const app = express();

app.use(cors(), express.json());
app.use("/api/employee", employeeRouter);
app.use("/api/driver", driverRouter);
app.use("/api/companies", CompaniesRouter);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server ruunig on api http://192.168.1.168:${process.env.PORT}`);
})

