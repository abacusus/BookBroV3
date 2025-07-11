import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Messages.jsx';
import "../index.css";

const Channel = ({ user = null }) => {
  const hasScrolledOnLoad = useRef(false);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef();
  const bottomListRef = useRef();
  const scrollToBottom = () => {
    bottomListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const { uid, displayName, photoURL } = user || {};

  const messagesRef = collection(db, 'messages');

  // Polling effect
  useEffect(() => {
    let isMounted = true;

    const messagesRef = collection(db, 'messages');
    const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(50));

    const fetchMessages = async () => {
      const snapshot = await getDocs(messagesQuery);
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
         
      }));
      if (isMounted) {
        setMessages(fetchedMessages.reverse());

         if (!hasScrolledOnLoad.current) {
        setTimeout(() => {
          scrollToBottom();
          hasScrolledOnLoad.current = true;
        }, 100);
      }
        
      }
    };

    fetchMessages();
    
    const intervalId = setInterval(fetchMessages, 3000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const trimmed = newMessage.trim();

    if (trimmed) {
      await addDoc(messagesRef, {
        text: trimmed,
        createdAt: serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });

      setNewMessage('');
      bottomListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="overflow-auto flex-1 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">💬 React ChatRoom</h2>
            <p className="text-gray-500">Start a conversation below!</p>
          </div>

          <ul className="space-y-4 mb-6 pb-6">
            {messages.map(message => (
              <li key={message.id}>
                <Message {...message} currentUser={user} />
              </li>
            ))}
            <div ref={bottomListRef} />
          </ul>
        </div>
      </div>

      <div className="bg-white border-t p-4 sticky bottom-0">
        <form onSubmit={handleOnSubmit} className="flex max-w-3xl mx-auto space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

export default Channel;
