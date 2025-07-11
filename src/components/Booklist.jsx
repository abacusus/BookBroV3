import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const bookRefs = useRef([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const snapshot = await getDocs(collection(db, 'booksforsale'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(data);
      bookRefs.current = data.map(() => React.createRef());
    };

    fetchBooks();
  }, []);

  const scrollToBook = (index) => {
    const ref = bookRefs.current[index];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Mobile Top Menu */}
      <div className="md:hidden bg-white p-4 shadow sticky top-0 z-20">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-blue-600 font-semibold"
        >
          📚 Book Menu ▾
        </button>
        {menuOpen && (
          <ul className="mt-2  border rounded shadow animate-fade-in">
            {books.map((book, i) => (
              <li key={book.id}>
                <button
                  onClick={() => scrollToBook(i)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  {book.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-gradient-to-br from-[#6ca2e0] via-[#3c4757] to-[#9763eb]  backdrop-blur-lg p-4 border-r shadow h-screen sticky top-0 overflow-y-auto z-10">
        <h2 className="text-xl font-bold mb-4">📚 Book List</h2>
        <ul className="space-y-2">
          {books.map((book, i) => (
            <li key={book.id}>
              <button
                onClick={() => scrollToBook(i)}
                className="text-left w-full text-white/70 text-2xl hover:underline transition"
              >
                {book.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gradient-to-r from-[#6ca2e0] via-[#3c4757] to-[#9763eb]  overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-white/90  ">
        📖 Book Listings</h1>

        {books.map((book, i) => (
          <div
            key={book.id}
            ref={bookRefs.current[i]}
            className="bg-gradient-to-r from-indigo-200 via-purple-200  rounded-xl shadow hover:shadow-lg transform hover:scale-[1.01] transition-all duration-300 ease-in-out p-6 mb-6 animate-fade-in"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{book.title}</h2>
            <p className="text-gray-500 italic mb-3">by {book.author}</p>

            {book.images?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {book.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${book.title} - ${index + 1}`}
                    className="w-full h-64 object-contain rounded shadow hover:shadow-md transition"
                  />
                ))}
              </div>
            )}

            <div className="space-y-1 text-gray-700 text-sm sm:text-base">
              <p><strong>Price:</strong> ₹{book.price} <span className="text-gray-400 line-through">₹{book.mrp}</span></p>
              <p><strong>Condition:</strong> {book.condition}</p>
              <p><strong>Delivery:</strong> {book.delivery}</p>
              <p><strong>Location:</strong> {book.location}</p>
              <p><strong>Seller:</strong> {book.userName}</p>
              <p><strong>Contact:</strong> {book.contact}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Booklist;
