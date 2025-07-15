import Subscriber from "../models/Subscriber.js";

export async function getSubscribers(req, res) {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addSubscriber(req, res) {
  try {
    const { email } = req.body;
    // Check if a subscriber with the same email already exists
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: "This subscriber already exists." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res
      .status(201)
      .json({ message: "Subscribed successfully", subscriber: newSubscriber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
