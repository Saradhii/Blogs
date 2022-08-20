import "./Blog.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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

type Comments = {
  blog_id:string;
  user_id:string;
  message:string;
  rating:string;
  user:[{ name:string}];
  };

type Reactions = {
    blog_id:string;
    user_id:string;
    emoji:string;
    user:[{ name:string}];
    };

type Users = {
      _id:string;
      name:string;
      email:string;
      social_profile:{};
      addresses:[{}];
      blogs:[];
    };

const Blog = () => {

    const [blog,setBlog] = useState<Blog[]>([]);
    const [comments,setComments] = useState<Comments[]>([]);
    const [reactions,setReactions] = useState<Reactions[]>([]);
    const [users,setUsers] = useState<Users[]>([]);
    const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/blogs/blog${id}`)
      .then((responce: AxiosResponse<Blog[]>) => {
        const { data } = responce;
        setBlog(data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/comments/${id}`)
      .then((responce: AxiosResponse<Comments[]>) => {
        const { data } = responce;
        setComments(data);
      });
  }, []);

  console.log(comments);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reactions/${id}`)
      .then((responce: AxiosResponse<Reactions[]>) => {
        const { data } = responce;
        setReactions(data);
      });
  }, []);
  
  // console.log(blog);
  // console.log(comments[0].user_id); http://localhost:8080/users/62b5c4acee4fa8e8e14a449e

  // console.log(comments.length);

  var arr:any[]=[];
  // for(let i=0;i<comments.length;i++)
  // {
  //   axios
  //   .get(`http://localhost:8080/users/${comments[i].user_id}`)
  //   .then((responce: AxiosResponse<Users[]>) => {
  //     const { data } = responce;
  //     // console.log(i);
  //     // console.log(data);
  //     setUsers(data);
  //   });
  // }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/`)
      .then((responce: AxiosResponse<Users[]>) => {
        const { data } = responce;
        setUsers(data);
      });
  }, []);

  // console.log(users);

  const [formData, Setformdata] = useState({});
  const [formReaction, SetReaction] = useState({});

    const handleChange = (e:any)=>{
        let name = e.target.name;
        Setformdata({
        ...formData,
        "blog_id":id,
        [name]: e.target.value,
        [name]: e.target.value,
        [name]: e.target.value,
        // "createdAt":new Date(),
        // "updatedAt":new Date(),
        // "deleted":false,
    });
    }

    const handleReaction = (e:any)=>{
      let name = e.target.name;
      SetReaction({
      ...formReaction,
      "blog_id":id,
      [name]: e.target.value,
      [name]: e.target.value,
      // "createdAt":new Date(),
      // "updatedAt":new Date(),
      // "deleted":false,
  });
  }

  const handleSubmitReaction= (e:any)=>{
    e.preventDefault();
    // console.log(formReaction);
    axios.post(`http://localhost:8080/reactions/newreaction`, formReaction, {
        headers: { "Content-Type": "application/json" },
      });
      window.location.reload();
  }


    const handleSubmit = (e:any)=>{
      e.preventDefault();
      console.log(formData);
      axios.post(`http://localhost:8080/comments/newcomment`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        window.location.reload();
    }
  

  return (
    <div className="bgg1">
      <Link to="/blogs"><button className="button button6">Back</button></Link>
        {blog && blog.map((e)=>{
            return(
              <>
              <div>
              <div className="singleblog1" key={e._id}>
              <div className='singleblog'>
                  <h3>{e.title}</h3>
                  <p>{e.content}</p>
              </div>
              <div className="comments">
                <div>
                <p>Comments ({comments.length}) :</p>
                 {comments && comments.map((c)=>{
                return(
                  <div className="singlec">
                 <p>{c.user[0].name} : {c.message} </p>
                  </div>
                )
                 })}
                </div>


                <div>
                <p>&nbsp;&nbsp;Reactions:({reactions.length})</p>
                   <div className="singlee">
                   {reactions && reactions.map((c)=>{
                   return(
                  <div className="singlec">
                  {c.user[0].name} : {c.emoji}
                  </div>
                   )
                   })}
              </div>
                </div>


                <div>
                <div className="commentform">
                <form onSubmit={handleSubmit}>
                  <label>Comment:</label><br></br>
                  <input type="text" name="message" onChange={handleChange}></input><br></br><br></br>
                  <label>Comment as:</label><br></br>
                  <select name="user_id" onChange={handleChange}>
                  {users && users.map((u)=>{
                     return(
                        <option value={u._id}>{u.name}</option>
                           )
                  })}
                  </select><br></br><br></br>
                  <label>Rate it out of 5 / :</label>&nbsp;&nbsp;<br></br>
                  <input type="text" name="rating" onChange={handleChange}></input><br></br><br></br>
                  <input type="submit"></input>
                </form>
                </div>
                </div>


                <div>
                <div className="commentform">
                <form onSubmit={handleSubmitReaction}>
                  <label>React:</label><br></br>
                  <select name="emoji" onChange={handleReaction}>
                  <option value="👍">👍</option>
                  <option value="👍">👍</option>
                  <option value="😍">😍</option>
                  <option value="😁">😁</option>
                  <option value="😂">😂</option>
                  </select><br></br><br></br>
                  <label>React as:</label><br></br>
                  <select name="user_id" onChange={handleReaction}>
                  {users && users.map((u)=>{
                     return(
                        <option value={u._id}>{u.name}</option>
                           )
                  })}
                  </select><br></br><br></br>
                  <input type="submit"></input>
                </form>
              </div>
                </div>
              </div>
              </div>
             {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Created at: {e.createdAt} <br></br>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;updated at: {e.updatedAt} */}
             </div>
              </>
            )
        })}
    </div>
  )
}

export default Blog