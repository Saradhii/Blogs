import "./CreateBlog.css";
import { useState,useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {Link} from "react-router-dom";

type Users = {
  _id:string;
  name:string;
  email:string;
  social_profile:{};
  addresses:[{}];
  blogs:[];
};



const CreateBlog = () => {
    const [formData, Setformdata] = useState({});
    const [userid, SetUserId] = useState ({});
    const [users,setUsers] = useState<Users[]>([]);

    useEffect(() => {
      axios
        .get(`http://localhost:8080/users/`)
        .then((responce: AxiosResponse<Users[]>) => {
          const { data } = responce;
          setUsers(data);
        });
    }, []);

    const handleSubmitUser = (e:any)=>{
      
      console.log(e.target.value);

    }

    const handleChange = (e:any)=>{
        let name = e.target.name;
        Setformdata({
        ...formData,
        [name]: e.target.value,
        [name]: e.target.value,
        "createdAt":new Date(),
        "updatedAt":new Date(),
        "deleted":false,
    });
    }

    
    const handleSubmit = (e:any)=>{
        e.preventDefault();
        console.log(formData);
        axios.post(`http://localhost:8080/blogs/create`, formData, {
            headers: { "Content-Type": "application/json" },
          }).then((responce: AxiosResponse<Users[]>) => {
            const { data } = responce;
            SetUserId(data);
          });
      };

    

  return (
    <>
    <Link to="/"><button>Home</button></Link>
    <div className="bmain">
        <div className="btitle">Write and publish ur blog</div>
        <div className="bbody">
            <form onSubmit={handleSubmit}>
            <label>Title :</label><br></br>
            <input type="text" name="title" onChange={handleChange}></input><br></br><br></br>
            <label>Content :</label><br></br>
            <textarea typeof="text" name="content" onChange={handleChange}></textarea><br></br><br></br>
            <div className="blogs">
            <label>Select blogs by user</label> &nbsp;&nbsp;
            <select name="users" onChange={handleSubmitUser}>
            {users && users.map((u)=>{
            return(
            <option value={u._id}>{u.name}</option>
            )
            })}
            </select>
            </div>
            <input type="submit"></input><br></br><br></br>
            </form>
        </div>
    </div>
    </>
    
  )
}

export default CreateBlog