import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

type Blog = {
    _id: string;
    title: string;
    content: string;
    createdAt:Date;
    updatedAt:Date;
    deleted:boolean;
  };

const Delete = () => {

    const { id } = useParams();

    const handleDelete = (e :any)=>{
           console.log(e);

           axios.put(`http://localhost:8080/blogs/delete${id}`);

           alert("Blog moved to Deleted blogs");
           
           window.location.href="http://localhost:3000/blogs";
    }

  return (
    <div className='deleteb'>
        Are sure you want to delete ? <br></br> <br></br>
        <button onClick={handleDelete}>Delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button>Cancel</button>
    </div>
  )
}

export default Delete