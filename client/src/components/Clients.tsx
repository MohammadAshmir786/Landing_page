import { useEffect, useState } from "react";
import axios from "axios";
import type { Client } from "../types";

export default function Clients(props:{API: string}) {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    axios.get(`${props.API}/clients`).then((res) => setClients(res.data));
  }, [props.API]);

  return (
    <section id="testimonials" className="px-6 py-12 bg-gray-100">
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Happy Clients</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {clients.map((client) => (
          <div key={client._id} className="bg-white p-4 rounded shadow">
            <img
              src={`${props.API}/${client.image}`}
              className="w-full h-40 object-cover rounded"
              alt={client.name}
            />
            <h4 className="mt-2 font-bold text-lg">{client.name}</h4>
            <p className="text-sm italic text-gray-600">{client.designation}</p>
            <p className="text-sm mt-1">{client.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
