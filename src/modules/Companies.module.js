import Company from "../DB/models/Companies.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { Name, NameEN, TaxRegistration, Customercode } = req.body;
    const existingCompany2 = await Company.findOne({ TaxRegistration });
    const existingCompany3 = await Company.findOne({ Customercode });
    if (existingCompany2 || existingCompany3) {
      return res.status(409).json({ message: "Company already exists" });
    }
    await Company.create({ Name, NameEN, TaxRegistration, Customercode });
    res.status(201).json({ message: "Company created successfully" });
  } catch (error) {
    console.log(`register company error ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find(
      {},
      "-createdAt -updatedAt -__v",
    );
    res
      .status(200)
      .json({ message: "Companies found successfully", companies });
  } catch (error) {
    console.log(`get companies error ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    company.isActive = !company.isActive;
    await company.save();

    res.status(200).json({
      message: "Company status toggled",
      company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
