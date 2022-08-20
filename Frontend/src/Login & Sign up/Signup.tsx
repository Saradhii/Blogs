import {Link} from "react-router-dom";

const Signup = () => {
  return (
    <>
    <div className="bgg">
    <div className='under'>
    <div className="main">
    <div className='main1'>CREATE NEW ACCOUNT</div>
    <div className="main21">
    <input type="text" name="username" placeholder="Enter your username"/><br></br>
    <input type="password" name="password" placeholder="Enter your password"/><br></br>
    <button className="button button6">SUBMIT</button>
    </div>
    </div>
    <Link to="/login"><button className="button0">Login</button></Link>
    </div>
    </div>
    </>
  )
}

export default Signup