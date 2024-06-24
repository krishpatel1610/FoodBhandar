const mongoose = require('mongoose');
const url = 'mongodb+srv://krishpatel1623:Krish16@foodbhandar.ofdbtkm.mongodb.net/FoodBhandar?retryWrites=true&w=majority&appName=FoodBhandar';
const mongoDB = async () => {
    try {
      await mongoose.connect(url);
      console.log("Connected successfully");
  
      // Fetch data from the 'food_items' collection
      const foodItemsCollection = mongoose.connection.db.collection("food_item");
      const data = await foodItemsCollection.find({}).toArray();
      const foodCategory = mongoose.connection.db.collection("foodCategory");
      const catData = await foodCategory.find({}).toArray();
    //   console.log(data);
      global.food_item = data; // creating global variable for food_items in javascript.
      global.foodCategory = catData; // creating global variable for food_items in javascript.
      // console.log(global.food_item);
      
    } catch (error) {
      console.error("Database connection error:", error);
    }
  };
  
  module.exports = mongoDB;