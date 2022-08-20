import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {Routes ,Route} from "react-router-dom";
import Blogs from './components/Blogs/Blogs';
import Blog from './components/Blog/Blog';
import CreateBlog from './components/New Blog/CreateBlog';
import DeletedBlogs from './components/Deleted Blogs/DeletedBlogs';
import Delete from './components/Delete/Delete';
import Edit from './components/Edit/Edit';
import Login from './Login & Sign up/Login';
import Signup from './Login & Sign up/Signup';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blog:id" element={<Blog/>}/>
      <Route path="/blog/create" element={<CreateBlog/>}/>
      <Route path="/blogs/trash" element={<DeletedBlogs/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/delete:id" element={<Delete/>}/>
      <Route path="/edit:id" element={<Edit/>}/>
    </Routes>
    </>  
  );
}

export default App;
