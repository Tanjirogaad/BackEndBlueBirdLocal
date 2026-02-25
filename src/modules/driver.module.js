import Driver from "../DB/models/driver.model.js";

export const registerDriver = async (req, res) => {
  try {
    const { name, nameEN, Customercode } = req.body;
    const existingDriver = await Driver.findOne({ Customercode });
    if (existingDriver) {
      return res.status(409).json({ message: "Driver already exists" });
    }
    await Driver.create({ name, nameEN, Customercode });
    res.status(201).json({ message: "Driver created successfully" });
  } catch (error) {
    console.log(`register driver error ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.status(200).json({ message: "Drivers found successfully", drivers });
  } catch (error) {
    console.log(`get drivers error ${error}`);
    res.status(500).json({ message: error.message });
  }
};

