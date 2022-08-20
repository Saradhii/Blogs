import "./Home.css";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <>
    <div className="bgg">
    <div className="main">
    <div className='main1'>BLOGS</div>
    
    <div className="main2">
    <Link to="blogs"><button className="button button5">Blogs List</button></Link>
    <Link to="blog/create"><button className="button button2">Create a blog</button></Link>
    <Link to="blogs/trash"><button className="button button3">Deleted blogs</button></Link>
    <Link to="/login"><button className="button button6">Login</button></Link>
    </div>
    </div>
    </div>
    </>
  )
}

export default Home