const express = require("express");

const { getAllPeople, getPeople, createPeople, updatePeople, deletePeople } = require("../controllers/dataControllers");

const router = express.Router();

router.get("/", getAllPeople);

router.get("/:id", getPeople);

router.post("/create/new", createPeople);

router.put("/update/:id", updatePeople);

router.delete("/delete/:id", deletePeople);

module.exports = router;
