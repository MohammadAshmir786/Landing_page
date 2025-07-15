import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard(props:{API: string}) {
  const [projectCount, setProjectCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [projects, clients, contacts, subscribers] = await Promise.all([
        axios.get(`${props.API}/projects`),
        axios.get(`${props.API}/clients`),
        axios.get(`${props.API}/contacts`),
        axios.get(`${props.API}/subscribers`),
      ]);
      setProjectCount(projects.data.length);
      setClientCount(clients.data.length);
      setContactCount(contacts.data.length);
      setSubscriberCount(subscribers.data.length);
    };
    fetchCounts();
  }, [props.API]);

  return (
    <section className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">📊 Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded text-center">
          <h3 className="text-xl font-bold text-blue-700">{projectCount}</h3>
          <p className="text-sm text-gray-700">Projects</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <h3 className="text-xl font-bold text-green-700">{clientCount}</h3>
          <p className="text-sm text-gray-700">Clients</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded text-center">
          <h3 className="text-xl font-bold text-yellow-700">{contactCount}</h3>
          <p className="text-sm text-gray-700">Contacts</p>
        </div>
        <div className="bg-purple-100 p-4 rounded text-center">
          <h3 className="text-xl font-bold text-purple-700">{subscriberCount}</h3>
          <p className="text-sm text-gray-700">Subscribers</p>
        </div>
      </div>
    </section>
  );
}