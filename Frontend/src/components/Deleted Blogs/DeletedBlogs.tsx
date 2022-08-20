import "../Blogs/Blogs.css";
import { useState,useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {Link} from "react-router-dom";

type Blog = {
  _id: string;
  title: string;
  content: string;
  createdAt:Date;
  updatedAt:Date;
  deleted:boolean;
};

const DeletedBlogs = () => {

    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
      axios
        .get(`http://localhost:8080/blogs/deleted`)
        .then((responce: AxiosResponse<Blog[]>) => {
          const { data } = responce;
          setBlogs(data);
        });
    }, []);
    
    console.log(blogs);

    const handleClick =(e:any)=>{

      axios.put(`http://localhost:8080/blogs/restore${e._id}`);

      alert("Blog Restored");
      window.location.reload();
    }

    const handleDelete = (e:any)=>{

      axios.delete(`http://localhost:8080/blogs/deleteit${e._id}`)
      alert("Blog Deleted");
      window.location.reload();
    }
  
  return (
    <>
    <Link to="/"><button>Home</button></Link>
    <div className='blogt'>
        DELETED BLOGS
    </div>
    <div className='blogm'>
        <h3>ID</h3>
        <h3>TITLE</h3>
        <h3>RESTORE</h3>
        <h3>DELETE</h3>
    </div>
    <div className='blogd'>
      {blogs && blogs.map((e)=>{
        return(
          <div className="blogg" key={e._id}>
          <Link to={`/blog${e._id}`}><p>{e._id}</p></Link> 
           <p>{e.title}</p>
           <button className="mainbutton" onClick={() => {handleClick(e);}}>Restore</button>
           <Link to=""><button className="mainbutton" onClick={() => {handleDelete(e);}}>DELETE</button>(*Permenalty deletes your blog)</Link>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default DeletedBlogs