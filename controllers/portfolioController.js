import Portfolio from "../models/Portfolio.js";

// ➕ CREATE Portfolio
export const createPortfolio = async (req, res) => {
  try {
    const { title, description, liveDemo } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!title || !description || !liveDemo || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const portfolio = await Portfolio.create({
      title,
      description,
      liveDemo,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📥 GET ALL
export const getAllPortfolio = async (req, res) => {
  try {
    const data = await Portfolio.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 📄 GET SINGLE
export const getSinglePortfolio = async (req, res) => {
  try {
    const data = await Portfolio.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏️ UPDATE
export const updatePortfolio = async (req, res) => {
  try {
    const { title, description, liveDemo } = req.body;

    let portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: "Not found" });
    }

    // 🖼️ new image (optional)
    const image = req.file ? req.file.filename : portfolio.image;

    portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        liveDemo,
        image,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Portfolio updated",
      portfolio,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ DELETE
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: "Not found" });
    }

    await portfolio.deleteOne();

    res.json({
      success: true,
      message: "Portfolio deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};