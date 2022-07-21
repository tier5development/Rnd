const mongoose = require('mongoose');
/**
  * Defining the db name, hosts, user and password for setting up mongo db connection
*/

// // Do not use it
// mongoose.connect('mongodb://localhost:27017/Etainement', {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// }).then(() => {
//     console.log('conected to Etainment Db');
// }).catch((err) => {
//     console.log('conected Error', err);
// });


let secondryDbUrl = 'mongodb+srv://ankur:fakira123@cluster0.iqtduvk.mongodb.net/?retryWrites=true&w=majority';
let primaryDbUrl = 'mongodb+srv://ankur:fakira123@cluster0.iqtduvk.mongodb.net/?retryWrites=true&w=majority';

mongoose.SecondryDb = mongoose.createConnection(secondryDbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

mongoose.PrimaryDb = mongoose.createConnection(primaryDbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
});


module.exports = mongoose;
