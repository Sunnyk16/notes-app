import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Home() {
  const [notes,setNotes] =useState([]);

  const loadNotes =async ()=>{
    const response =await axios.get(`${process.env.REACT_APP_API_URL }/notes`);

    setNotes(response.data.data);
    console.log(response.data.data);

  }

  useEffect(()=>{
    loadNotes();
  },[])
  return (
    <div className='card card-body '>
      {
        notes.map((note , index)=>{
          return(
            <div className=' card-body  bg-red-400 m-2 p-2 w-52 capitalize  rounded-md'>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p>{note.category}</p>
              </div>
          )
        } )
      }
    </div>
  )
}

export default Home