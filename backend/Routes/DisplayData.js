const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.food_item,global.foodCategory]);
    } catch (error) {
        console.log(error.message);
        res.send("Server error");
    }
});

module.exports = router;