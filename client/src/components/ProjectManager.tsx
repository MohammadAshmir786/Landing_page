import { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { Project } from "../types";

export default function ProjectManager(props: { API: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    image: File | null;
  }>({
    name: "",
    description: "",
    image: null,
  });

  // Reference to the hidden file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchProjects = () => {
    axios.get(`${props.API}/projects`).then((res) => setProjects(res.data));
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (project: Project) => {
    setEditingId(project._id);
    setFormData({
      name: project.name,
      description: project.description,
      image: project.image,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    const updatedFormData = new FormData();

    // Append text fields (name, description)
    updatedFormData.append("name", formData.name);
    updatedFormData.append("description", formData.description);

    // Append the image file if it exists
    if (formData.image) {
      updatedFormData.append("image", formData.image);
    }

    try {
      // Send a PUT request with FormData
      await axios.put(`${props.API}/projects/${editingId}`, updatedFormData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      });

      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${props.API}/projects/${id}`);
    fetchProjects();
  };

  return (
    <section className="bg-white shadow-md rounded-lg p-6 mb-10">
      <h2 className="text-xl font-bold mb-4 text-blue-600">
        📂 Manage Projects
      </h2>
      <ul className="space-y-4">
        {projects.map((proj) => (
          <li
            key={proj._id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-2 gap-4"
          >
            {editingId === proj._id ? (
              <div className="flex flex-col md:flex-row gap-2 w-full md:items-center">
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border p-2 rounded w-full md:w-1/3"
                />
                <input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border p-2 rounded w-full md:w-1/2"
                />

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  style={{ display: "none" }}
                />

                {/* Image preview */}
                <div>
                  {formData.image ? (
                    <img
                      src={formData.image instanceof File ? URL.createObjectURL(formData.image) : `${props.API}/${formData.image}`}
                      alt="preview"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    <img
                      src={`${props.API}/${proj.image}`} // Display the existing project image
                      alt="existing preview"
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                </div>

                {/* Custom Choose File Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Choose File
                </button>

                {/* Cancel Button */}
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>

                {/* Save Button */}
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-grow">
                {/* Project details */}
                <div>
                  <p className="font-semibold">{proj.name}</p>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                </div>

                {/* Image preview */}
                <div>
                  <img
                    src={`${props.API}/${proj.image}`}
                    alt={proj.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>

                {/* Edit and Delete buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(proj)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
