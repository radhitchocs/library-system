const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: Date,
  returnDate: Date,
});

module.exports = mongoose.model('Borrowing', borrowingSchema);