import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLW9WaKPqSXSbcnrP86hdn3e35sA8jtxo",
  authDomain: "citavalodav2.firebaseapp.com",
  projectId: "citavalodav2",
  storageBucket: "citavalodav2.appspot.com",
  messagingSenderId: "307657094221", // Project Number from your screenshot
  appId: "1:307657094221:web:ded979d55b11fd90c0b85a" // Example App ID, often not required for auth
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);