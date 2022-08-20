import "./Blogs.css";
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

type Users = {
  _id:string;
  name:string;
  email:string;
  social_profile:{};
  addresses:[{}];
  blogs:[];
};

const Blogs = () => {
  const [blogs,setBlogs] = useState<Blog[]>([]); 
  const [users,setUsers] = useState<Users[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/blogs`)
      .then((responce: AxiosResponse<Blog[]>) => {
        const { data } = responce;
        setBlogs(data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/`)
      .then((responce: AxiosResponse<Users[]>) => {
        const { data } = responce;
        setUsers(data);
      });
  }, []);

  const handleSort = (e:any) =>{
   console.log(e.target.value);     
  }
  
  // console.log(blogs);
  // console.log(users);

  return (
    <>
    <div className="bgg1">
    <Link to="/"><button className="button button6">Home</button></Link>
    <div className='blogt'>
        ALL THE BLOGS
    </div>
    <div className="blogs">
    <label>select blogs by user</label> &nbsp;&nbsp;
    <select name="users" onChange={handleSort}>
    {users && users.map((u)=>{
      return(
        <option value={u._id}>{u.name}</option>
      )
    })}
    </select>
    </div>
    <div className='blogm'>
        <h3>ID</h3>
        <h3>TITLE</h3>
        <h3>EDIT</h3>
        <h3>DELETE</h3>
    </div>
    <div className='blogd'>
      {blogs && blogs.map((e)=>{
        return(
          <div className="blogg" key={e._id}>
          <Link to={`/blog${e._id}`}><p>{e._id}</p></Link> 
           <p>{e.title}</p>
           <Link to={`/edit${e._id}`}><button className="button button2">Edit</button></Link>
           <Link to={`/delete${e._id}`}><button className="button button3">Delete</button></Link>
          </div>
        )
      })}
    </div>
    </div>
    </>
  )
}

export default Blogs