import { useEffect, useState } from "react";
import axios from "axios";
import type { Project} from "../types";


export default function Projects(props: { API: string }) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get(`${props.API}/projects`).then((res) => setProjects(res.data));
  }, [props.API]);

  return (
    <section id="projects" className="px-6 py-12 bg-white">
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Our Projects</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-100 p-4 rounded shadow">
            <img
              src={`${props.API}/${project.image}`}
              className="w-full h-40 object-cover rounded"
              alt={project.name}
            />
            <h4 className="mt-2 font-bold text-lg">{project.name}</h4>
            <p className="text-sm">{project.description}</p>
            <button className="mt-2 text-blue-500">Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
}