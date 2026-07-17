import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpRequest } from "../../lib/http";
import { toast } from "react-toastify";

const Content = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [formData, setFormData] = useState({
    filename: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await httpRequest.put(`/api/note/${id}`, formData);

      toast.success(data.message || "Note updated successfully");
      setFormData({ filename: "", content: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const fetchNote = async () => {
    try {
      const { data } = await httpRequest.get(`/api/note/${id}`);
      const note = data?.data;

      setFormData({
        filename: note?.filename || "",
        content: note?.content || "",
      });
    } catch (error) {
     navigate("/app/notebook")
    }
  };

  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Note</h1>

        <p className="text-center text-gray-500 mb-6">
          Write down your thoughts
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Filename</label>

            <input
              type="text"
              name="filename"
              placeholder="Enter the filename"
              value={formData.filename}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>

            <textarea
              name="content"
              placeholder="Write your content here..."
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Content;
