import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import reportWebVitals from 'misc/reportWebVitals';
// Router
import { BrowserRouter } from 'react-router-dom';
// Contexts
import { AuthContextProvider } from 'contexts/AuthContext';
import { CartContextProvider } from 'contexts/CartContext';
import { LSModalContextProvider } from 'contexts/LSModalContext';

// Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration (asegurate de tener esto bien configurado en tu archivo .env)
const firebaseConfig = {
  apiKey: "AIzaSyDzHQl0JBWvDrLdp00Hjei1xn3wiPeXXyk",
  authDomain: "carnicerialoskrenz.firebaseapp.com",
  projectId: "carnicerialoskrenz",
  storageBucket: "carnicerialoskrenz.firebasestorage.app",
  messagingSenderId: "784886750743",
  appId: "1:784886750743:web:5c6226d24ecf018bf94652"
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Render React app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <LSModalContextProvider>
            <App />
          </LSModalContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Performance reporting (opcional)
reportWebVitals();
