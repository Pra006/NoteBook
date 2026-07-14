import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
const notebookData = [
  {
    id: 1,
    title: "React Basics",
    size: "102KB",
    createdAt: "14 Jul 2026",
    status: "",
  },
  {
    id: 2,
    title: "Node.js Authentication",
    size: "102KB",
    createdAt: "13 Jul 2026",
    status: "",
  },
  {
    id: 3,
    title: "MongoDB Aggregation",
    size: "102KB",
    createdAt: "12 Jul 2026",
    status: "",
  },
];

const NoteBook = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Notebook</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">SN</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Created At</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {notebookData.map((note, index) => (
                <tr key={note.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{note.title}</td>
                  <td className="px-4 py-3">{note.category}</td>
                  <td className="px-4 py-3">{note.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-5">
                      <Link to="/app/notebook/1">
                        <button className="px-2 py-1 rounded-md text-white hover:bg-blue-500 bg-blue-300">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="px-2 py-1 rounded-md text-white hover:bg-red-500 bg-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {note.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NoteBook;
