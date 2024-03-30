import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useParams } from "react-router-dom";

function NewNode() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const { id } = useParams(); // Move the declaration of id inside the component body

  const loadNote = async (id) => {
    if (!id) {
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/${id}`);
      setTitle(response.data.data.title);
      setCategory(response.data.data.category);
      setContent(response.data.data.content);
    } catch (error) {
      console.error("Error loading note:", error);
      toast.error("Failed to load note. Please try again.");
    }
  };

  const updateNote = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, {
        title: title,
        category: category,
        content: content
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note. Please try again.");
    }
  };

  useEffect(() => {
    loadNote(id);
  }, [id]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-3xl font-semibold mb-4">Update Note</h1>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 mb-4 p-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
        ></textarea>

        <button
          type="button"
          onClick={updateNote}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NewNode;
