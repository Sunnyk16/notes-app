import React from "react";
import { Link } from "react-router-dom";
import deli from "./delete (1).png"
import updi from "./feather-pen.png"
import axios from "axios";
import UpdateNote from "../../views/updateNote/UpdateNote";

function NewCard(note) {
    const {_id ,title ,content,category, loadNotes}=note;

    const deleteNote=async ()=>{
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/${_id}`);
        alert(response.data.message);
        loadNotes()
       
    }
  return (
    <div>
      
      <div className=" card-body  bg-red-400 m-2 p-2 w-1/2 mx-auto capitalize  rounded-md">
        <div className="flex justify-between">
        <h3>{note.title}</h3>
        <p className=" bg-white w-14 rounded-sm text-center  ">{note.category}</p>
        </div>
        
        <p>{note.content}</p>
        <div className="flex  justify-end">
            <img src={deli} className="h-6 w-6 m-1" onClick={deleteNote}></img>

            <Link to={`/update/${_id}`}><img src={updi} className="h-6 w-6 m-1" onClick={UpdateNote}></img></Link>
        </div>
        
      </div>
    </div>
  );
}

export default NewCard;
