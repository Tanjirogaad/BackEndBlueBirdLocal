import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Employee from "../DB/models/employee.model.js";
import BlackListToken from "../DB/models/black-list-token.model.js";

export const registerEmployee = async (req, res) => {
    try {
        const { Account, JobInformation } = req.body;
        const email = Account?.email;
        const code = JobInformation?.EmployeeCode;

        const existingEmployee = await Employee.findOne({ "Account.email": email });
        if (existingEmployee) {
            return res.status(409).json({ message: "Employee already exists" });
        }
        const existingEmployeeCode = await Employee.findOne({
            "JobInformation.EmployeeCode": code,
        });
        if (existingEmployeeCode) {
            return res.status(409).json({ message: "Employee code already exists" });
        }
        await Employee.create(req.body);
        res.status(201).json({ message: "Employee created successfully" });

    } catch (error) {
        console.log(`register employee error ${error}`);
        res.status(500).json({ message: error.message });
    }

};

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();

        const employee = await Employee.findOne({ "Account.email": email });
        if (!employee || employee.Account.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const accessToken = jwt.sign({ id: employee._id }, process.env.JWT_SECRET_LOGIN, { expiresIn: "10m", jwtid: uuidv4() });
        const refreshToken = jwt.sign({ id: employee._id }, process.env.JWT_SECRET_REFRESH, { expiresIn: "8h", jwtid: uuidv4() });
        return res.status(200).json({ message: "Login successfully", accessToken, refreshToken });
    } catch (error) {
        console.log(`login error ${error}`);
        return res.status(500).json({ message: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const { accesstoken } = req.headers;
        const accessTokenData = jwt.verify(accesstoken, process.env.JWT_SECRET_LOGIN);

        if (!accessTokenData) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const employee = await Employee.findById(accessTokenData.id);
        if (employee.JobInformation?.role === "admin") {
            const allData = await Employee.find({}, "-Account -createdAt -updatedAt -__v");
            return res.status(200).json({
                message: "Employee found successfully",
                employee: {
                    FullName: employee.PersonalInformation?.FullName,
                    EmployeeCode: employee.JobInformation?.EmployeeCode,
                    role: employee.JobInformation?.role,
                    AnnualLeave: employee.WorkSchedule.AnnualLeave,
                    data: allData,
                },
            });
        } else {
            res.status(200).json({
                message: "Employee found successfully",
                employee: {
                    FullName: employee.PersonalInformation?.FullName,
                    EmployeeCode: employee.JobInformation?.EmployeeCode,
                    role: employee.JobInformation?.role,
                    AnnualLeave: employee.WorkSchedule.AnnualLeave,
                },
            });
        }
    } catch (error) {
        console.log(`getProfile error ${error}`);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "access token expired" });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: "not authorized refresh token" });
        }
        const refreshTokenData = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
        const accessToken = jwt.sign({ id: refreshTokenData.id }, process.env.JWT_SECRET_LOGIN, { expiresIn: "10m", jwtid: uuidv4() });

        return res.status(200).json({ message: "Login successfully", accessToken });
    } catch (error) {
        console.log(`refreshToken error ${error}`);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "refresh token expired" });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken, accessToken } = req.body;
        if (!refreshToken || !accessToken) {
            return res.status(401).json({ message: "not authorized refresh token" });
        }
        const refreshTokenData = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
        const accessTokenData = jwt.verify(accessToken, process.env.JWT_SECRET_LOGIN);
        await BlackListToken.insertMany([
            {
                tokenId: refreshTokenData.jti,
                expiresAt: refreshTokenData.exp,
            },
            {
                tokenId: accessTokenData.jti,
                expiresAt: accessTokenData.exp,
            },
        ]);
        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "token expired" });
        } else {
            return res.status(500).json({ message: error.message });
        }
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email, SocialInsuranceNumber, password, confirmPassword } = req.body;
        const employee = await Employee.findOne({ "Account.email": email });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        if (employee.Accounts.SocialInsuranceNumber !== SocialInsuranceNumber) {
            return res.status(400).json({ message: "SocialInsuranceNumber not match" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        employee.Account.password = password;
        await employee.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(`forgotPassword error ${error}`);
        return res.status(500).json({ message: error.message });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { OldPassword, NewPassword, ConfirmNewPassword, code } = req.body;
        const employee = await Employee.findOne({ "JobInformation.EmployeeCode": code });
        if (employee.Account.password !== OldPassword) {
            return res.status(400).json({ message: "OldPassword not match" });
        }
        if (NewPassword !== ConfirmNewPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        employee.Account.password = NewPassword;
        await employee.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.log(`forgotPassword error ${error}`);
        return res.status(500).json({ message: error.message });
    }
};


