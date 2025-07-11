// src/App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // <-- adjust if needed


// Components
import Login from "./components/Login";
import BooksForm from "./components/booksform";
//import Channel from "./components/Channels";
import ChatWidget from "./components/chatwidget";
import Home from "./components/Home"; 
import BookList from './components/Booklist';

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true); // prevent flicker

  useEffect(() => {
     document.title = "BookBro";
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  if (checkingAuth) return <div>
    <img 
        src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ajkxNjhxc2Z4MnpmdDNtajhnbXQ1MTFxNWYxc2c0Zm5zYXVtZ2FtaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26xBt4sgshBHznJHa/giphy.gif" 
        alt="You are Dumb." 
        style={{ width: '300px', height: 'auto' }} 
      /></div>; // Optional loader

  return (
     <Router>
      <Routes>
        {/* Home page: accessible to everyone */}
        <Route path="/" element={<Home />} />

        <Route path="/list" element={<BookList />} />

        {/* Login: only show if not logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/books" /> : <Login />}
        />

        {/* Books Form: only accessible if logged in */}
        <Route
          path="/books"
          element={user ? <BooksForm user={user} /> : <Navigate to="/login" />}
        />

        {/* Catch-all: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Optional ChatWidget */}
      {user && <ChatWidget user={user} />}
    </Router>
  );
}

export default App;
