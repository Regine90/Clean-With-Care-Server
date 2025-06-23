const communityData = require("../data/communityData");

const getAllPeople = async (req, res, next) => {
  try {
    const peoples = data;
    return res.status(200).json({
      success: {
        message: "This will lead to all the people pages in the data file.",
      },
      data: { peoples },
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

const getPeople = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const people = data.find((people) => people._id === _id);
    return res.status(200).json({
      success: { message: "Successful to continue!" },
      data: { people },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Errorrr. Try again!" },
    });
  }
};

const createPeople = async (req, res, next) => {
  const { firstName, area, service } = req.body;

  try {
    const newPeople = {
      firstName,
      area,
      service,
    };

    return res.status(201).json({
      success: { message: "Sucessful!" },
      data: { newPeople },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Failed. Try again!" },
    });
  }
};

const updatePeople = async (req, res, next) => {
  const { firstName, area, service } = req.body;
  const { _id } = req.params;

  try {
    const updatedPeople = {
      firstName,
      area,
      service,
    };

    return res.status(201).json({
      success: { message: "Yayyy!!" },
      data: { updatedPeople },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Update Failed!" },
    });
  }
};

const deletePeople = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const peoples = data.filter((peoples) => peoples._id !== _id);
    return res.status(200).json({
      success: { message: "Successful again!" },
      data: { peoples },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Not working!" },
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
