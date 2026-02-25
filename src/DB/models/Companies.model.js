import { Schema, model } from "mongoose";

const CompanySchema = new Schema(
  {
    Name: { type: String, required: true },
    NameEN: { type: String, required: true },
    TaxRegistration: { type: String, required: true, unique: true },
    Customercode: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export default model("Company", CompanySchema);
