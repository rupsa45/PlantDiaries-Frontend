
import { BookOpen, Heart, Users } from 'lucide-react'

const FeatureSections = () => {
    
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
    <div className="grid md:grid-cols-3 gap-8">
      {/* Document Journey Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="h-6 w-6 text-orange-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Document Journey</h3>
        <p className="text-gray-600">
          Create personalized digital diaries tracking every milestone of your plants' lives.
        </p>
      </div>

      {/* Share Stories Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Heart className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Share Stories</h3>
        <p className="text-gray-600">
          Connect with a community of plant lovers, sharing your green adventures and inspirations.
        </p>
      </div>

      {/* Learn & Grow Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Learn & Grow</h3>
        <p className="text-gray-600">
          Access a comprehensive knowledge base with expert tips, care guides, and plant health insights.
        </p>
      </div>
    </div>
  </div>
  )
}

export default FeatureSections
