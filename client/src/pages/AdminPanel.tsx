// File: client/src/pages/AdminPanel.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import type { Project, Client, Contact, Subscriber } from "../types";
import AdminDashboard from "../components/AdminDashboard";
import ProjectManager from "../components/ProjectManager";
import ImageCropper from "../components/ImageCropper";

const API = "http://localhost:5000/api";

export default function AdminPanel() {
  const [projectData, setProjectData] = useState<Project>({
    _id: "",
    name: "",
    description: "",
    image: null,
  });

  const [clientData, setClientData] = useState<Client>({
    _id: "",
    name: "",
    description: "",
    designation: "",
    image: null,
  });

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppingType, setCroppingType] = useState<"project" | "client" | null>(
    null
  );

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (projectData.image) formData.append("image", projectData.image);
    formData.append("name", projectData.name);
    formData.append("description", projectData.description);
    try {
      await axios.post(`${API}/projects`, formData);
      alert("Project added");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (clientData.image) formData.append("image", clientData.image);
    formData.append("name", clientData.name);
    formData.append("description", clientData.description);
    formData.append("designation", clientData.designation);
    try {
      await axios.post(`${API}/clients`, formData);
      alert("Client added");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get(`${API}/contacts`).then((res) => setContacts(res.data));
    axios.get(`${API}/subscribers`).then((res) => setSubscribers(res.data));
  }, []);

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "project" | "client"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageToCrop(reader.result);
          setCroppingType(type);
            }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: File) => {
    if (croppingType === "project") {
      setProjectData({ ...projectData, image: croppedImage });
    } else if (croppingType === "client") {
      setClientData({ ...clientData, image: croppedImage });
    }
    setImageToCrop(null);
    setCroppingType(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Admin Panel
      </h1>
      <AdminDashboard API={API} />
      <ProjectManager API={API} />

      {/* Add Project */}
      <section className="mb-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">➕ Add Project</h2>
        <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            className="border p-2"
            placeholder="Project Name"
            onChange={(e) =>
              setProjectData({ ...projectData, name: e.target.value })
            }
          />
          <input
            type="text"
            className="border p-2"
            placeholder="Project Description"
            onChange={(e) =>
              setProjectData({ ...projectData, description: e.target.value })
            }
          />
          <input
            type="file"
            className="border p-2"
            accept="image/*"
            onChange={(e) => handleImageSelect(e, "project")}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Project
          </button>
        </form>
      </section>

      {/* Add Client */}
      <section className="mb-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">➕ Add Client</h2>
        <form onSubmit={handleClientSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            className="border p-2"
            placeholder="Client Name"
            onChange={(e) =>
              setClientData({ ...clientData, name: e.target.value })
            }
          />
          <input
            type="text"
            className="border p-2"
            placeholder="Description"
            onChange={(e) =>
              setClientData({ ...clientData, description: e.target.value })
            }
          />
          <input
            type="text"
            className="border p-2"
            placeholder="Designation"
            onChange={(e) =>
              setClientData({ ...clientData, designation: e.target.value })
            }
          />
          <input
            type="file"
            className="border p-2"
            accept="image/*"
            onChange={(e) => handleImageSelect(e, "client")}
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add Client
          </button>
        </form>
      </section>

      {/* Contact Form Responses */}
      <section className="mb-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          📬 Contact Form Submissions
        </h2>
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li key={contact._id} className="border-b py-1">
              {contact.name} - {contact.email} - {contact.city}
            </li>
          ))}
        </ul>
      </section>

      {/* Newsletter Subscribers */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          📧 Newsletter Subscribers
        </h2>
        <ul className="space-y-2">
          {subscribers.map((sub) => (
            <li key={sub._id} className="border-b py-1">
              {sub.email}
            </li>
          ))}
        </ul>
      </section>
      {/* Image Cropper Modal */}
      {imageToCrop && croppingType ? (
        <>
          {(document.body.style.overflow = "hidden")}
          <ImageCropper
            image={imageToCrop}
            onCancel={() => {
              setImageToCrop(null);
              setCroppingType(null);
            }}
            onCropComplete={handleCropComplete}
          />
        </>
      ) : (
        (document.body.style.overflow = "auto")
      )}
    </div>
  );
}
