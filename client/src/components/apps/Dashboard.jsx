import React, { useEffect, useState } from "react";
import { FileText, HardDrive, Clock } from "lucide-react";
import { httpRequest } from "../../lib/http";

const formatSize = (bytes) => {
  if (!bytes) return "0 KB";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalNotes: 0,
    memoryUsed: 0,
    recentNotes: [],
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await httpRequest.get("/api/dashboard");
      setDashboard(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);

  const { totalNotes, memoryUsed, recentNotes } = dashboard;
  const memoryLimit = 1024 * 1024 * 1024;
  const memoryPercent = Math.min((memoryUsed / memoryLimit) * 100, 100);
  const notesThisWeek = recentNotes.filter(
    (note) =>
      new Date(note.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Notebook Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and track all your notes in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Files</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {totalNotes}
                </h2>

                <p className="text-sm text-green-600 mt-2">
                  +{notesThisWeek} this week
                </p>
              </div>

              <div className="bg-blue-100 p-4 rounded-xl">
                <FileText className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Memory Used</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {formatSize(memoryUsed)}
                </h2>

                <p className="text-sm text-gray-500 mt-2">of 1 GB available</p>
              </div>

              <div className="bg-purple-100 p-4 rounded-xl">
                <HardDrive className="text-purple-600" size={28} />
              </div>
            </div>

            <div className="mt-5">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${memoryPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Recent Activity</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {notesThisWeek}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Notes created this week
                </p>
              </div>

              <div className="bg-green-100 p-4 rounded-xl">
                <Clock className="text-green-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Notes
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your recently created notes
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Filename
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Size
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Created At
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {recentNotes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No notes yet
                    </td>
                  </tr>
                ) : (
                  recentNotes.map((note) => (
                    <tr key={note._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <FileText size={18} className="text-blue-600" />
                          </div>

                          <span className="font-medium text-gray-800">
                            {note.filename}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {formatSize(note.content?.length || 0)}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
