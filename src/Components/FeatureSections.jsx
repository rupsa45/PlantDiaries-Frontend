
import React from 'react'
import { featureCards } from '../utils/Data'

const FeatureSections = () => {
    
  return (
    <div>
      <section className="container mx-auto py-16 px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${card.image})`}}></div>
              <div className="absolute inset-0   opacity-70 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative z-10 p-6  text-center font-bold text-[#0F2A1D]">
                {card.icon}
                <h3 className="text-xl text-black font-bold mt-4">{card.title}</h3>
                <p className="mt-2 roboto-slab opacity-80">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
    </section>
    </div>
  )
}

export default FeatureSections
