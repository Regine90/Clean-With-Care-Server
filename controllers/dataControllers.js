const communityHelper = require("../models/communityHelper");

// GET all people
const getAllPeople = async (req, res, next) => {
  try {
    const helpers = await communityHelper.find();

    return res.status(200).json({
      success: {
        message: "This will lead to all the people pages in the data file.",
      },
      data: { helpers },
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        message:
          "The information being requested could not be found. Please try again!",
      },
    });
  }
};

// GET one person by ID
const getPeople = async (req, res, next) => {
  const { id } = req.params;

  try {
    const people = await communityHelper.findById(id);

    if (!people) {
      return res.status(404).json({
        error: { message: "Helper not found!" },
      });
    }

    return res.status(200).json({
      success: { message: "Successfully found the helper!" },
      data: { people },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Error. Try again!" },
    });
  }
};

// POST create person
const createPeople = async (req, res, next) => {
  const { firstName, area, service } = req.body;

  try {
    const newHelper = new communityHelper({
      firstName,
      area,
      service,
    });

    await newHelper.save();

    return res.status(201).json({
      success: { message: "Helper created successfully!" },
      data: newHelper,
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Creation failed. Try again!" },
    });
  }
};

// PUT update person by ID
const updatePeople = async (req, res, next) => {
  const { id } = req.params; 
  const { firstName, area, service } = req.body;

  try {
    const updatedHelper = await communityHelper.findByIdAndUpdate(
      id, 
      { firstName, area, service },
      { new: true }
    );

    if (!updatedHelper) {
      return res.status(404).json({
        error: { message: "Helper not found!" },
      });
    }

    return res.status(200).json({
      success: { message: "Helper updated successfully!!" },
      data: updatedHelper,
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Update failed!" },
    });
  }
};

// DELETE person by ID
const deletePeople = async (req, res, next) => {
  const { id } = req.params; 
  console.log("ID to delete:", id);


  try {
    const deletedHelper = await communityHelper.findByIdAndDelete(id); 

    if (!deletedHelper) {
      return res.status(404).json({
        error: { message: "Helper not found!" },
      });
    }

    return res.status(200).json({
      success: { message: "Helper deleted successfully!" },
      data: deletedHelper,
    });
  } catch (error) {
    console.error("Delete error:", error); 
    return res.status(400).json({
      error: { message: "Deletion failed!" },
      
    });
  }
};


module.exports = {
  getAllPeople,
  getPeople,
  createPeople,
  updatePeople,
  deletePeople,
};
