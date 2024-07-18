const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  borrowDate: Date,
  returnDate: Date,
});

module.exports = mongoose.model('Borrowing', borrowingSchema);