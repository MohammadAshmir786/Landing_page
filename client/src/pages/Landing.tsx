import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

const API = "http://localhost:5000/api";

export default function Landing() {

  return (
    <div className="bg-gray-50 text-gray-800">
        <Navbar />
        <Hero />
        <AboutUs />
        <Projects API={API} />
        <Clients API={API} />
        <ContactForm API={API} />
        <Newsletter API={API} />
        <Footer />
    </div>
  );
}
