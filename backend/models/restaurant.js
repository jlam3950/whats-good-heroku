const mongoose = require('mongoose');
const restaurant = new mongoose.Schema({
    restaurantName: String,
    ID: String,
    AvgRating: Number,
    MenuItems: [{
        FoodID: String,
        FoodName: String,
        Rating: Number,
        Reviews:[{
            Username: String,
            UserRating: Number,
            Description: String,
            Date: Date,

        }]
    }],
    Address: String,

})

module.exports = mongoose.model('restaurant', restaurant);
