import Footer from "./Footer";
import Navbar from "./Navbar";


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 font-sans">
      {/* Navbar at the top */}
      <Navbar />

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;