/**
 * Created by lan on 16/5/31.
 */

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/DATABASE_UBOOK');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connection mongodb success')
});

const Book = mongoose.model('Book', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    imageUrl: String,
    thumbnailUrl: String,
    summary: String,
    content: String,
    createTime: Number,
    editTime: Number
})

export default Book;