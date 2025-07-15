import { useState } from "react";
import axios from "axios";

export default function ContactForm(props:{API: string}) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const submitContact = async () => {
    await axios.post(`${props.API}/contacts`, contact);
    alert("Contact submitted");
  };

  return (
    <section id="contact" className="px-6 py-12 bg-white">
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Contact Us</h3>
      <div className="grid gap-4 max-w-xl">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2"
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email Address"
          className="border p-2"
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          className="border p-2"
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          className="border p-2"
          onChange={(e) => setContact({ ...contact, city: e.target.value })}
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={submitContact}
        >
          Submit
        </button>
      </div>
    </section>
  );
}
