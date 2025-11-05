import React from 'react';
import { GoogleIcon } from '../components/icons';

interface LoginScreenProps {
  onGoogleSignIn: () => void;
  onBack: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onGoogleSignIn, onBack }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Admin Access
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Please sign in to manage audiobooks.
          </p>
          
          <div className="flex flex-col gap-4 pt-4">
            <button
              type="button"
              onClick={onGoogleSignIn}
              className="w-full bg-white text-gray-700 font-bold py-3 px-4 rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center gap-3"
            >
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;