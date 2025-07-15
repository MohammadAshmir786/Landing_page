import { useState } from "react";
import axios from "axios";

export default function Newsletter(props:{API: string}) {
  const [email, setEmail] = useState<string>("");

  const submitNewsletter = async () => {
    await axios.post(`${props.API}/subscribers`, { email });
    alert("Subscribed successfully");
  };

  return (
    <section className="px-6 py-12 bg-blue-50">
      <h3 className="text-2xl font-semibold mb-4 text-blue-600">
        Subscribe to our Newsletter
      </h3>
      <div className="max-w-md flex gap-2">
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 flex-grow"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={submitNewsletter}
        >
          Subscribe
        </button>
      </div>
    </section>
  );
}
