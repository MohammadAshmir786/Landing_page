import Project from '../models/Project.js';

// Get all projects
export const getProjects = async (_req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects from the database
    res.json(projects);  // Send the projects as JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create a new project
export const addProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : ''; // If there's an image, save the file path

    // Check if a project with the same name and description already exists
    const existingProject = await Project.findOne({ name, description});

    if (existingProject) {
      return res.status(400).json({ message: "This project already exists." });
    }

    const newProject = new Project({
      name,
      description,
      image,
    });

    // Save the project to the database
    await newProject.save();

    // Return the newly created project as the response
    res.status(201).json(newProject);  // Send back the new project object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update the projects
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file ? req.file.path : ''; // If there's an image, save the file path

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.name = name;
    project.description = description;
    project.image = image;

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}