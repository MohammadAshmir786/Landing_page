import Client from "../models/Client.js";

export async function getClients(req, res) {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addClient(req, res) {
  try {
    const { name, description, designation } = req.body;

    // Check if a client with the same name, description, and designation already exists
    const existingClient = await Client.findOne({ name, description, designation });

    if (existingClient) {
      return res.status(400).json({ message: "This client already exists." });
    }
    
    const newClient = new Client({
      name,
      description,
      designation,
      image: req.file?.path || "",
    });
    await newClient.save();
    res.status(201).json({ message: "Client added", client: newClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
