import axios from "axios";
import React, { useState } from "react";

function NewNode() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");

  const addNote = async () => {
    const response =await axios.post(`${process.env.REACT_APP_API_URL}/notes`,{
      title:title,
      category:category,
      content:content
    })
    alert(response.data.message)
    setTitle('')
    setContent('')
    setCategory('')
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-3xl font-semibold mb-4">New Note</h1>
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
          onClick={addNote}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NewNode;
