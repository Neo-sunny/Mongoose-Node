const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url ='mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, {
    useMongoClient: true
});

connect.then((db) => {
    
    console.log('Connected to the server Correctly....');
    
    Dishes.create({
        name: 'Uthapizza',
        description: 'test'
    })
    .then((dish) =>{
            console.log(dish);
        
        return Dishes.find({}).exec();
    }).then((dishes) => {
        console.log(dishes);
        
        return db.collection('dishes').drop();
    }).then(() =>{
        return db.close();
        
    }).catch((err) =>{
        console.log(err);
    });
});