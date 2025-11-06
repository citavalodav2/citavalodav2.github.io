import React from 'react';
import { Story } from '../types';
import { User } from 'firebase/auth';

interface AudiobookCardProps {
  story: Story;
  onSelect: (id: string) => void;
}

const AudiobookCard: React.FC<AudiobookCardProps> = ({ story, onSelect }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer" onClick={() => onSelect(story.id)}>
    <img src={story.coverImage} alt={`${story.title} cover`} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800">{story.title}</h3>
      <button className="mt-4 w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        Start Reading
      </button>
    </div>
  </div>
);


interface HomeScreenProps {
  stories: Story[];
  user: User | null;
  onSelectStory: (id: string) => void;
  onNavigateToLogin: () => void;
  onNavigateToAdmin: () => void;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ stories, user, onSelectStory, onNavigateToLogin, onNavigateToAdmin, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 tracking-tight">
          Welcome to Citavaloda
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Interactive audiobooks designed to help children, especially those with autism, learn and enjoy stories with simple language and clear visuals.
        </p>
      </header>

      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 flex-grow">
        {/* About Section */}
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">About the Project</h2>
          <p className="text-lg text-gray-700 space-y-4">
            Citavaloda provides a calm and engaging reading experience. Each story is presented with one sentence at a time, paired with a beautiful illustration.
            <br /><br />
            Children can listen to the narration in English, Latvian, or Russian, helping them with language development in a supportive, low-pressure environment. We believe in making literature accessible and fun for every child.
          </p>
        </div>

        {/* Audiobook Browser */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Browse Audiobooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map(story => (
              <AudiobookCard key={story.id} story={story} onSelect={onSelectStory} />
            ))}
          </div>
        </div>
      </main>
      <footer className="w-full text-center p-4 mt-8">
        {user ? (
          <div className="flex justify-center items-center gap-6">
             <button 
                onClick={onNavigateToAdmin}
                className="text-gray-600 hover:text-blue-600 hover:underline transition-colors"
              >
                Admin Panel
              </button>
              <button 
                onClick={onLogout}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
          </div>
        ) : (
          <button 
            onClick={onNavigateToLogin}
            className="text-gray-600 hover:text-blue-600 hover:underline transition-colors"
          >
            Teacher/Admin Login
          </button>
        )}
      </footer>
    </div>
  );
};

export default HomeScreen;