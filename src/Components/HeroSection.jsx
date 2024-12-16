import { Link } from 'react-router-dom'
import '../App.css'

const HeroSection = () => {
  return (
    <div>
       <section 
        className="relative h-[75vh]  flex items-center justify-center text-center"
      >
        <img
        src="/hero2.jpeg"
        alt="Leafy background"
        className="absolute inset-0  w-full h-full object-cover z-0 opacity-50"
      />
        <div className="absolute inset-0 bg-[#013237] opacity-60"></div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl font-bold agu-display text-[#EAF9E7] mb-6 drop-shadow-lg">
            Cultivate Your Green Narrative
          </h2>
          <p className="text-xl text-[#EAF9E7]  roboto-slab  mb-8 max-w-2xl mx-auto">
            Transform your plant care journey into a beautiful, shareable story. Connect, learn, and grow with a community that celebrates every leaf and bloom.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#4CA771] text-white px-8 py-3 rounded-full hover:bg-[#3A8C5A] transition-colors">
              <Link to="/plant-diary-form">
              Start Your Diary
              </Link>
            </button>
            <button className="border-2 border-[#EAF9E7] text-[#EAF9E7] px-8 py-3 rounded-full hover:bg-[#EAF9E7] hover:text-[#013237] transition-colors">
             <Link to='/discover'>
              Explore Plants
             </Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
