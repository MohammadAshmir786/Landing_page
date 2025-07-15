import { useState, useEffect } from "react";
import logo from "/logo.png";

export default function Navbar() {
  // State to store the active tab
  const [activeTab, setActiveTab] = useState("home");

  // Function to handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Track the scroll position and update the active tab accordingly
  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentTab = "home";

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      if (sectionTop <= 150 && sectionBottom >= 150) {
        // Check which section is currently visible
        currentTab = section.id;
      } else if(sectionTop == 0){
        currentTab = "home"
      }
    });

    setActiveTab(currentTab);
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="bg-white p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="logo flex items-center">
        <img src={logo} alt="SyncHomes Logo" height={10} width={50} />
        <h1 className="text-xl font-bold text-blue-600">SyncHomes</h1>
      </div>
      <ul className="flex gap-6 text-sm font-medium">
        {/* Home Tab */}
        <li className="nav-tabs">
          <a
            href="#home"
            className={`hover:text-blue-500 text-blue-800 nav-links ${activeTab === "home" ? "active" : ""}`}
            onClick={() => handleTabClick("home")}
          >
            HOME
          </a>
        </li>
        {/* Services Tab */}
        <li className="nav-tabs">
          <a
            href="#about"
            className={`hover:text-blue-500 text-blue-800 nav-links ${activeTab === "about" ? "active" : ""}`}
            onClick={() => handleTabClick("about")}
          >
            SERVICES
          </a>
        </li>
        {/* About Projects Tab */}
        <li className="nav-tabs">
          <a
            href="#projects"
            className={`hover:text-blue-500 text-blue-800 nav-links ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => handleTabClick("projects")}
          >
            ABOUT PROJECTS
          </a>
        </li>
        {/* Testimonials Tab */}
        <li className="nav-tabs">
          <a
            href="#testimonials"
            className={`hover:text-blue-500 text-blue-800 nav-links ${activeTab === "testimonials" ? "active" : ""}`}
            onClick={() => handleTabClick("testimonials")}
          >
            TESTIMONIALS
          </a>
        </li>
        {/* Contact Tab */}
        <li className="nav-tabs">
          <a
            href="#contact"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            CONTACT
          </a>
        </li>
      </ul>
    </nav>
  );
}
