import React, { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { httpRequest } from "../../lib/http";
import moment from "moment";
import { toast } from "react-toastify";
const NoteBook = () => {


  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    filename: "",
    content: "",
  });
  const fetchData = async () => {
    try {
      const { data } = await httpRequest.get("/api/note");
      setNotes(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };
  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Unable to delete note");
      return;
    }

    try {
      await httpRequest.delete(`/api/note/${id}`);
      toast.success("Note deleted");
      fetchData();
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await httpRequest.post("/api/note", formData);

      toast.success(data.message || "Note saved successfully");
      setFormData({ filename: "", content: "" });
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getNoteSize = (content = "") => {
    const sizeInKb = (content.length / 1024).toFixed(1);
    return `${sizeInKb} KB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-6">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
              Notebook Hub
            </p>
            <h1 className="text-3xl font-bold text-slate-800">Capture ideas beautifully</h1>
            <p className="mt-2 text-sm text-slate-600">
              Write, view, and manage your notes in one polished workspace.
            </p>
          </div>
          <div className="rounded-2xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">
            {notes.length} saved note{notes.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-800">Create a new note</h2>
              <p className="mt-1 text-sm text-slate-500">
                Start writing with a clean, distraction-free editor.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Filename
                </label>
                <input
                  type="text"
                  name="filename"
                  placeholder="Enter the filename"
                  value={formData.filename}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Content
                </label>
                <textarea
                  name="content"
                  placeholder="Write your content here..."
                  value={formData.content}
                  onChange={handleChange}
                  rows={10}
                  className="w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:from-indigo-700 hover:to-blue-700"
              >
                Save note
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Recent notes</h2>
                <p className="text-sm text-slate-500">Your saved notes at a glance.</p>
              </div>
            </div>

            {notes.length === 0 ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                <p className="text-lg font-semibold text-slate-700">No notes yet</p>
                <p className="mt-2 text-sm text-slate-500">
                  Your notes will appear here as soon as you save one.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((note, index) => (
                  <div
                    key={note._id || index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-300 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate font-semibold text-slate-800">
                            {note.filename}
                          </h3>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                            {getNoteSize(note.content)}
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                          {note.content}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 text-sm text-slate-500">
                      <span>
                        {moment(note.createdAt).format("DD MMM YYYY • hh:mm A")}
                      </span>
                      <div className="flex gap-2">
                        <Link to={`/app/notebook/${note._id || index}`}>
                          <button className="rounded-lg bg-blue-100 p-2 text-blue-700 transition hover:bg-blue-200">
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(note._id)}
                          className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteBook;
