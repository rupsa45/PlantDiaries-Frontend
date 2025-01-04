import { Link } from "react-router-dom";
import "../App.css";

const HeroSection = () => {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto relative">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10" />
          <h1 className="text-5xl  font-bold text-emerald-900 mb-6 relative z-10">
            Cultivate Your Green Narrative
          </h1>
          <p className="text-lg text-emerald-800 max-w-2xl mx-auto mb-8 relative z-10">
            Transform your plant care journey into a beautiful, shareable story.
            Connect, learn, and grow with a community that celebrates every leaf
            and bloom.
          </p>
          <div className="flex justify-center space-x-4 relative z-10">
            <Link
              to="/plant-diary-form"
              className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-500 transition transform hover:-translate-y-1"
            >
              Start Your Diary
            </Link>
            <Link
              to="/discover"
              className="bg-white/80 text-emerald-700 px-8 py-3 rounded-full hover:bg-white transition transform hover:-translate-y-1"
            >
              Explore Plants
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
