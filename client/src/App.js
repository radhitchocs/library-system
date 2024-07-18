import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import UserList from './components/UserList';
import BorrowingList from './components/BorrowingList';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import AddBorrowing from './pages/AddBorrowing';
import EditBorrowing from './pages/EditBorrowing';
import HomeSection from './components/HomeSection';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/books" className="mr-4">Books</Link>
          <Link to="/users" className="mr-4">Users</Link>
          <Link to="/borrowings" className="mr-4">Borrowings</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/add" element={<AddUser />} />
          <Route path="/books/edit/:id" element={<EditUser />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/borrowings" element={<BorrowingList />} />
          <Route path="/borrowings/add" element={<AddBorrowing />} />
          <Route path="/borrowings/edit/:id" element={<EditBorrowing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;