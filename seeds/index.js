const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Hotel = require('../models/hotel');

mongoose.connect('mongodb://localhost:27017/showtel', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Hotel.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Hotel({
            //YOUR USER ID
            author: '67bd79eb0a07a55b684453ce',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Great Experience! Loved the interactions and the community. Comfy beds with breath-taking views. Quality service and dining.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfuxtjjyp/image/upload/v1740471516/shadowspec-hotel-umbrella-header_timrbn.jpg',
                    filename: 'Showtel/shadowspec-hotel-umbrella-header_timrbn'
                },
                {
                    url: 'https://res.cloudinary.com/dfuxtjjyp/image/upload/v1740471733/Amenities-StateView-Outdoor-Pool_kvpinq.jpg',
                    filename: 'Showtel/Amenities-StateView-Outdoor-Pool_kvpinq'
                },
                {
                    url: 'https://res.cloudinary.com/dfuxtjjyp/image/upload/v1740471796/Nichiha-Cedar-Hospitality_oymuha.png',
                    filename: 'Showtel/Nichiha-Cedar-Hospitality_oymuha'
                },
                {
                    url: 'https://res.cloudinary.com/dfuxtjjyp/image/upload/v1740471900/ladera-st-lucia_jfout6.webp',
                    filename: 'Showtel/uladera-st-lucia_jfout6'
                },
                {
                    url: 'https://res.cloudinary.com/dfuxtjjyp/image/upload/v1740471949/960x0_ztblfu.jpg',
                    filename: 'Showtel/960x0_ztblfu'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})