/**
 * Created by lan on 16/5/31.
 */

var mongoose = require('./mongoose')

const Book = mongoose.model('Book', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    imageUrl: String,
    thumbnailUrl: String,
    summary: String,
    content: String,
    createTime: { type: Number, default: new Date().getTime() },
    editTime: { type: Number, default: new Date().getTime() },
    author: String
})

export default Book;