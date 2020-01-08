const mongoose = require("mongoose");
var connection = mongoose.connection;

const URI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI 
    : "mongodb://localhost:27017/";

mongoose.connect(URI,{
        dbName: "mern-taskapp",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

connection.on('error', console.error.bind(console, ' * Connection error:'));
connection.once('open', () => {
    // we're connected!
    console.log(" * DB is connected");
});

module.exports = mongoose;
