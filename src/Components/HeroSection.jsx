import { Link } from "react-router-dom";
import "../App.css";
import FeatureSections from "./FeatureSections";

const HeroSection = () => {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto relative">
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10" />
          <h1 className="text-5xl  font-bold text-emerald-900 mb-6 relative z-10">
            Nurture Your Plants, Share Your Story
          </h1>
          <p className="text-lg text-emerald-800 max-w-2xl mx-auto mb-8 relative z-10">
          Transform your plant care journey into a beautiful, 
          shareable narrative. Connect with a vibrant community,
           learn new tips, and celebrate every leaf and bloom together.
          </p>
          <div className="flex justify-center space-x-4 relative z-10">
            {/* <Link
              to="/plant-diary-form"
              className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-500 transition transform hover:-translate-y-1"
            >
              Join Now
            </Link> */}
            <Link
              to="/discover"
             className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-500 transition transform hover:-translate-y-1"
            >
              Explore Plants
            </Link>
          </div>
        </div>
      </div>
      <FeatureSections/>
      {/* Call to Action Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-emerald-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700" />
          <h2 className="text-3xl font-bold mb-6 relative z-10">Ready to Start Your Plant Journey?</h2>
          <p className="text-lg mb-8 relative z-10 max-w-2xl mx-auto">
            Join thousands of plant enthusiasts and start documenting your green adventures today.
          </p>
          <Link to="/" className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50 transition transform hover:-translate-y-1 relative z-10">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
