import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NewCard from '../../components/NewCard/NewCard.js';

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
      <h1 className='font-semibold  capitalize text-center'>notes-app</h1>
      {
        notes.map((note , index)=>{
          const {_id ,title ,content,category}=note;
          return(<NewCard key={_id} _id={_id} title={title} content={content} category={category} loadNotes={loadNotes}/>)
        } )
      }
    </div>
  )
}

export default Home