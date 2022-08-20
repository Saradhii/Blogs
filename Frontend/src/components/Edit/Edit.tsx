import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Edit = () => {
    const [formData, Setformdata] = useState({});
    const { id } = useParams();

    const handleChange = (e:any)=>{
        let name = e.target.name;
        Setformdata({
        ...formData,
        [name]: e.target.value,
        [name]: e.target.value,
    });
    }


    const handleSubmit = (e:any)=>{
        e.preventDefault();
        console.log(formData);
        axios.put(`http://localhost:8080/blogs/edit${id}`, formData, {
            headers: { "Content-Type": "application/json" },
          });
          
          alert("Blog updated");
    }

  return (
    <div className="bmain">
        <div className="btitle">Update your blog</div>
        <div className="bbody">
            <form onSubmit={handleSubmit}>
            <label>Title :</label><br></br>
            <input type="text" name="title" onChange={handleChange}></input><br></br><br></br>
            <label>Content :</label><br></br>
            <textarea typeof="text" name="content" onChange={handleChange}></textarea><br></br><br></br>
            <input type="submit" value={"update"}></input><br></br><br></br>
            </form>
        </div>
    </div>
  )
}

export default Edit