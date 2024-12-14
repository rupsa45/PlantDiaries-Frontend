import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <div>
       <footer className="bg-[#013237] text-[#EAF9E7] py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Plant Diaries</h4>
            <p>Connecting plant lovers worldwide, one leaf at a time.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {['About', 'Plant Care Wisdom', 'Terms of Service'].map((link) => (
                <a key={link} href="/" className="block hover:text-[#4CA771] transition-colors">{link}</a>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 hover:text-[#4CA771] transition-colors cursor-pointer" />
              <Twitter className="w-6 h-6 hover:text-[#4CA771] transition-colors cursor-pointer" />
              <Instagram className="w-6 h-6 hover:text-[#4CA771] transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-[#4CA771] pt-4">
          <p>© 2024 Plant Diaries. Nurturing communities, growing together.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
