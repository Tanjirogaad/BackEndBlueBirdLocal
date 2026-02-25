import { Schema, model } from "mongoose";

const DriverSchema = new Schema(
  {
    name: { type: String, required: true },
    nameEN: { type: String, required: true },
    Customercode: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export default model("driver", DriverSchema);
