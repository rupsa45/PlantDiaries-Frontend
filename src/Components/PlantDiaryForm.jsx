import React, { useState, useRef } from 'react';
import { 
  Leaf, 
  Image, 
  Paperclip, 
  BookOpen, 
  Save, 
  Send, 
  X 
} from 'lucide-react';

const PlantDiaryBookForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState({
    storyName: '',
    story: '',
    tags: '',
    categories: [],
    email: ''
  });
  const fileInputRef = useRef(null);

  const categories = [
    "Succulents", "Herbs", "Trees", "Flowers", "Others"
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const nextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, 3));
  };

  const prevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const renderPage = () => {
    switch(currentPage) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif text-[#013237]">
                Start Your Plant Diary
              </h2>
              <p className="text-[#4CA771]">Share the story of your green companion</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xl font-serif text-[#013237] mb-2">
                  Name Your Plant Story
                </label>
                <input
                  type="text"
                  name="storyName"
                  value={formData.storyName}
                  onChange={handleInputChange}
                  placeholder="e.g., My Jade Plant's Journey"
                  className="w-full px-4 py-3 border-b-2 border-[#4CA771] bg-transparent text-[#013237] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xl font-serif text-[#013237] mb-2">
                  Upload Plant Photos
                </label>
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-[#4CA771] rounded-lg p-6 text-center cursor-pointer hover:bg-[#EAF9E7] transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Image className="mx-auto w-12 h-12 text-[#4CA771] mb-4" />
                  <p className="text-[#013237]">Click or drag photos here</p>
                </div>

                {selectedImages.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative w-24 h-24 group">
                        <img 
                          src={image} 
                          alt={`Plant ${index + 1}`} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button 
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-serif text-[#013237] mb-2">
                Your Plant's Story
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleInputChange}
                rows="6"
                placeholder="Tell us about your plant's journey, care tips, and special memories..."
                className="w-full px-4 py-3 border-2 border-[#4CA771] rounded-lg bg-transparent text-[#013237] focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xl font-serif text-[#013237] mb-2">
                Add Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="#succulents #indoorplants #plantlove"
                className="w-full px-4 py-3 border-b-2 border-[#4CA771] bg-transparent text-[#013237] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xl font-serif text-[#013237] mb-2">
                Select Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`
                      px-4 py-2 rounded-full text-sm transition-all
                      ${formData.categories.includes(category) 
                        ? 'bg-[#4CA771] text-white' 
                        : 'bg-[#EAF9E7] text-[#013237] border border-[#4CA771]'}
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-serif text-[#013237] mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@plantdiaries.com"
                className="w-full px-4 py-3 border-b-2 border-[#4CA771] bg-transparent text-[#013237] focus:outline-none"
              />
            </div>

            <div className="text-center">
              <p className="text-[#013237] mb-4">
                Ready to share your plant's story with the world?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="bg-[#4CA771] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#3A8C5A] transition-colors"
                >
                  <Send className="w-5 h-5" /> Publish Diary
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF9E7] to-[#C0E6BA] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex">
        {/* Left Page (Book Cover) */}
        <div className="w-1/2 bg-[#013237] text-[#EAF9E7] p-12 flex flex-col justify-center">
          <BookOpen className="w-24 h-24 text-[#4CA771] mx-auto mb-6" />
          <h1 className="text-4xl font-serif text-center mb-4">
            Plant Diaries
          </h1>
          <p className="text-center mb-8">
            Your personal journal of green adventures
          </p>
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-3 h-3 rounded-full transition-all
                  ${currentPage === page ? 'bg-[#4CA771]' : 'bg-[#EAF9E7]/50'}
                `}
              />
            ))}
          </div>
        </div>

        {/* Right Page (Form Content) */}
        <div className="w-1/2 p-12 relative">
          <form className="h-full flex flex-col justify-between">
            <div>
              {renderPage()}
            </div>

            <div className="flex justify-between mt-6">
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={prevPage}
                  className="text-[#013237] flex items-center gap-2 hover:text-[#4CA771] transition-colors"
                >
                  <Leaf className="w-5 h-5" /> Previous
                </button>
              )}
              {currentPage < 3 && (
                <button
                  type="button"
                  onClick={nextPage}
                  className="ml-auto text-[#013237] flex items-center gap-2 hover:text-[#4CA771] transition-colors"
                >
                  Next <Leaf className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlantDiaryBookForm;