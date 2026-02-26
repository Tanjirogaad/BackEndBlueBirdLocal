import { Schema, model } from "mongoose";

const CompanySchema = new Schema(
  {
    Name: { type: String, required: true },
    NameEN: { type: String, required: true },
    TaxRegistration: { type: String, required: true, unique: true },
    Customercode: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default model("Company", CompanySchema);
