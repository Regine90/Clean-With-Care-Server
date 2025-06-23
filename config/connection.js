const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://Regine90:Sarahlove9@@cleanwithcare.gx79foe.mongodb.net/?retryWrites=true&w=majority&appName=CleanWithCare");
    console.log(`MongoDB database is connected.`);
  } catch (error) {
    console.log(`There was an error connecting to the database: ${error}`);
  }
}

main();
