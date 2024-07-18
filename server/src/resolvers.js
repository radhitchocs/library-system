const Book = require('./models/Book');
const User = require('./models/User');
const Borrowing = require('./models/Borrowing');

const resolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
    borrowings: async () => {
      try {
        const borrowings = await Borrowing.find().populate('user').populate('book');
        console.log('Fetched borrowings:', borrowings);
        return borrowings;
      } catch (error) {
        console.error('Error fetching borrowings:', error);
        throw new Error('Failed to fetch borrowings');
      }
    },
    borrowing: async (_, { id }) => {
      try {
        const borrowing = await Borrowing.findById(id).populate('user').populate('book');
        if (!borrowing) {
          throw new Error('Borrowing not found');
        }
        return borrowing;
      } catch (error) {
        console.error('Error fetching borrowing:', error);
        throw new Error('Failed to fetch borrowing');
      }
    },
  },
  Mutation: {
    addBook: async (_, { title, author, year }) => await Book.create({ title, author, year }),
    updateBook: async (_, { id, title, author, year }) => 
      await Book.findByIdAndUpdate(id, { title, author, year }, { new: true }),
    deleteBook: async (_, { id }) => await Book.findByIdAndDelete(id),

    addUser: async (_, { name, email }) => await User.create({ name, email }),
    updateUser: async (_, { id, name, email }) => 
      await User.findByIdAndUpdate(id, { name, email }, { new: true }),
    deleteUser: async (_, { id }) => await User.findByIdAndDelete(id), // Perbaiki dari Book ke User

    addBorrowing: async (_, { userId, bookId, borrowDate, returnDate }) => {
      try {
        const borrowing = await Borrowing.create({
          user: userId,
          book: bookId,
          borrowDate: new Date(borrowDate),
          returnDate: new Date(returnDate),
        });
        return await Borrowing.findById(borrowing._id).populate('user').populate('book');
      } catch (error) {
        console.error('Error adding borrowing:', error);
        throw new Error('Failed to add borrowing');
      }
    },
    updateBorrowing: async (_, { id, userId, bookId, borrowDate, returnDate }) => {
      try {
        const borrowing = await Borrowing.findByIdAndUpdate(
          id,
          {
            user: userId,
            book: bookId,
            borrowDate: new Date(borrowDate),
            returnDate: new Date(returnDate),
          },
          { new: true }
        );
        return await Borrowing.findById(borrowing._id).populate('user').populate('book');
      } catch (error) {
        console.error('Error updating borrowing:', error);
        throw new Error('Failed to update borrowing');
      }
    },
    deleteBorrowing: async (_, { id }) => await Borrowing.findByIdAndDelete(id),
  },
};

module.exports = resolvers;
