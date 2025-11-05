import React, { useState, useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import AudiobookPlayer from './screens/AudiobookPlayer';
import LoginScreen from './screens/LoginScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import { Story } from './types';
import { INITIAL_STORIES } from './constants';
import { auth } from './firebaseConfig';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { LoadingSpinner } from './components/icons';

type View = 'home' | 'player' | 'login' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSelectStory = (storyId: string) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      setSelectedStory(story);
      setView('player');
    }
  };

  const handleGoHome = () => {
    setSelectedStory(null);
    setView('home');
  };

  const handleNavigateToLogin = () => {
    setView('login');
  };
  
  const handleNavigateToAdmin = () => {
    if (user) {
      setView('admin');
    } else {
      setView('login');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setView('admin');
    } catch (error: any) {
      console.error("Authentication error:", error);
      if (error.code === 'auth/unauthorized-domain') {
        alert("Authentication failed: This application's domain is not authorized for sign-in. Please add the domain to the list of authorized domains in your Firebase project's authentication settings.");
      } else {
        alert("Could not sign in with Google. Please try again.");
      }
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setView('home');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleAddStory = (newStory: Story) => {
    setStories(prevStories => [...prevStories, newStory]);
    alert("Story added successfully!");
  };
  
  const renderView = () => {
    if (authLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-blue-500">
                <LoadingSpinner />
            </div>
        </div>
      );
    }

    switch (view) {
      case 'login':
        return <LoginScreen onGoogleSignIn={handleGoogleSignIn} onBack={() => setView('home')} />;
      case 'admin':
        if (!user) {
            return <LoginScreen onGoogleSignIn={handleGoogleSignIn} onBack={() => setView('home')} />;
        }
        return <AdminPanelScreen user={user} stories={stories} onAddStory={handleAddStory} onLogout={handleLogout} />;
      case 'player':
        if (selectedStory) {
          return <AudiobookPlayer story={selectedStory} onGoHome={handleGoHome} />;
        }
        setView('home');
        return null;
      case 'home':
      default:
        return <HomeScreen 
          stories={stories} 
          user={user}
          onSelectStory={handleSelectStory} 
          onNavigateToLogin={handleNavigateToLogin}
          onNavigateToAdmin={handleNavigateToAdmin}
          onLogout={handleLogout}
        />;
    }
  };

  return (
    <div className="bg-sky-50 min-h-screen font-sans">
      {renderView()}
    </div>
  );
};

export default App;