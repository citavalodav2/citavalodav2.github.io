import React, { useState } from 'react';
import { Story, Slide, Language } from '../types';
import { LogoutIcon } from '../components/icons';
// @ts-ignore - Assuming User type will be available from a library like Firebase
import { User } from 'firebase/auth';

interface AdminPanelScreenProps {
  stories: Story[];
  user: User | null;
  onAddStory: (story: Story) => void;
  onLogout: () => void;
}

const AdminPanelScreen: React.FC<AdminPanelScreenProps> = ({ stories, user, onAddStory, onLogout }) => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [slides, setSlides] = useState<Omit<Slide, 'id'>[]>([]);

  const handleAddSlide = () => {
    setSlides([...slides, { image: '', text: { en: '', lv: '', ru: '' } }]);
  };

  const handleRemoveSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
  };

  const handleSlideChange = (index: number, field: 'image' | Language, value: string) => {
    const newSlides = [...slides];
    if (field === 'image') {
      newSlides[index].image = value;
    } else {
      newSlides[index].text[field] = value;
    }
    setSlides(newSlides);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !coverImage || slides.length === 0) {
      alert('Please fill out all fields and add at least one slide.');
      return;
    }
    const newStory: Story = {
      id: title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      title,
      coverImage,
      slides: slides,
    };
    onAddStory(newStory);
    // Reset form
    setTitle('');
    setCoverImage('');
    setSlides([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800">
              Admin Panel
            </h1>
            {user && <p className="text-gray-600">Welcome, {user.displayName || 'Administrator'}!</p>}
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story List */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Existing Stories</h2>
            <ul className="space-y-2">
              {stories.map((story) => (
                <li key={story.id} className="text-lg text-gray-800 bg-gray-50 p-3 rounded-md">
                  {story.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Add New Story Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Add New Story</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Story Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                <input type="url" id="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              </div>
              
              <div className="space-y-4">
                 <h3 className="text-xl font-bold text-gray-800">Slides</h3>
                 {slides.map((slide, index) => (
                   <div key={index} className="bg-gray-50 p-4 rounded-lg border relative">
                    <button type="button" onClick={() => handleRemoveSlide(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">&times;</button>
                     <p className="font-semibold mb-2">Slide {index + 1}</p>
                     <input type="url" placeholder="Image URL" value={slide.image} onChange={e => handleSlideChange(index, 'image', e.target.value)} className="mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                     <textarea placeholder="English Text" value={slide.text.en} onChange={e => handleSlideChange(index, Language.EN, e.target.value)} className="mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                     <textarea placeholder="Latvian Text" value={slide.text.lv} onChange={e => handleSlideChange(index, Language.LV, e.target.value)} className="mb-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                     <textarea placeholder="Russian Text" value={slide.text.ru} onChange={e => handleSlideChange(index, Language.RU, e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                   </div>
                 ))}
                 <button type="button" onClick={handleAddSlide} className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Add Slide</button>
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">Save New Story</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanelScreen;