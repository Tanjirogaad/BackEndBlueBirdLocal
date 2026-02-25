import { Schema, model } from "mongoose";
const EmployeeSchema = new Schema(
  {
    PersonalInformation: {
      FullName: { type: String, required: true },
      NationalIDNumber: { type: String, required: true, unique: true },
      DateOfBirth: { type: String, required: true },
      Gender: { type: String, required: true, enum: ["ذكر", "أنثى"] },
      Nationality: { type: String, required: true },
      Religion: { type: String, required: true },
      MaritalStatus: {
        type: String,
        required: true,
        enum: ["أرمل", "مطلق", "متزوج", "أعزب"],
      },
      PersonalPhoto: String,
    },

    Address: {
      Governorate: { type: String, required: true },
      Area: { type: String, required: true },
      DetailedAddress: { type: String, required: true },
      PhoneNumbers: [{ type: String, required: true }],
    },

    EducationalQualifications: {
      Qualification: { type: String, required: true },
      Specialization: String,
      University: String,
      GraduationYear: String,
    },

    JobInformation: {
      EmployeeCode: { type: String, required: true, unique: true },
      Department: {
        type: String,
        required: true,
        enum: [
          "الحسابات",
          "التشغيل",
          "التسويق",
          "الدعم الفني",
          "الاستقبال",
          "الادارة العليا",
          "نظم المعلومات",
        ],
      },
      JobTitle: { type: String, required: true },
      role: {
        type: String,
        required: true,
        default: "employee",
      },
      WorkLocation: { type: String, default: "6 اكتوبر الحي 11" },
      HiringDate: { type: String, required: true },
      EmploymentStatus: { type: String, required: true },
      DirectManagers: [{ type: String, required: true }],
    },

    WorkSchedule: {
      StartTime: { type: String, required: true },
      EndTime: { type: String, required: true },
      TimeOff: [{ type: String }],
      SickLeave: { type: String, required: true, default: "365" },
      AnnualLeave: { type: String, required: true },
    },

    Accounts: {
      SocialInsuranceNumber: { type: String, required: true },
      AccountHolderName: String,
      BankName: String,
      BankAccountNumber: String,
      Documents: [{ type: String }],
      Salary: { type: String, default: "0" },
    },

    Contacts: {
      Relationship: String,
      PersonName: String,
      PhoneNumber: String,
      Address: String,
    },

    Account: {
      email: { type: String, required: true, unique: true, lowercase: true },
      password: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export default model("Employee", EmployeeSchema);
