import Contact from "../models/Contact.js";

export async function getContacts(_req, res) {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addContact(req, res) {
  try {
    const { name, email, phone, city } = req.body;

    // Check if a contact with the same email already exists
    const existingContact = await Client.findOne({ email});

    if (existingContact) {
      return res.status(400).json({ message: "This contact already exists." });
    }

    const newContact = new Contact({ name, email, phone, city });
    await newContact.save();
    res.status(201).json({
      message: "Contact added successfully!",
      contact: newContact,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
