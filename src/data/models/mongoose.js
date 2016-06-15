/**
 * Created by lan on 16/6/7.
 */


var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/DATABASE_UBOOK');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connection mongodb success')
});

module.exports = mongoose;