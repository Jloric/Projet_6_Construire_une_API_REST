const express = require('express');

const userRoutes = require('./route/user.route')
const saucesRoutes = require('./route/sauce.route')
const mongoose = require('mongoose');
const path =require('path');


const app = express();
// mongoose.connect('mongodb+srv://master:ua2peausfjP8HgoS@cluster0.0hrae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch((err) => console.log(err),console.log('Connexion à MongoDB échouée !'));

const connectDB = async () => {
  try {
      await mongoose.connect(`mongodb+srv://master:ua2peausfjP8HgoS@cluster0.0hrae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
      });

      console.log('Connexion à MongoDB réussie !');
  } catch (err) {
    console.log(err),console.log('Connexion à MongoDB échouée !');
  }
};

connectDB();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(express.json());//to parse req
app.use(express.urlencoded({
  extended: true
}));
app.use('/images',express.static(path.join(__dirname,'images')));


app.use('/api/auth',userRoutes);
app.use('/api/sauces',saucesRoutes);

module.exports = app;
