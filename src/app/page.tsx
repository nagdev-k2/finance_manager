"use client";
import React, {useState} from "react";

const Home = () => {
  const [loginUser, setLoginUser] = useState({username: '', password: ''});
  const [signUpUser, setSignUpUser] = useState({username: '', password: '', confirmPassword: ''});

  const onChangeLoginFields = (e: { target: { name: string; value: string; }; }) => {
    setLoginUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onChangeSignUpFields = (e: { target: { name: string; value: string; }; }) => {
    setSignUpUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="mr-5 border-r-2 border-white p-5">
        <h1 className="text-2xl text-bold text-center mb-10">Login</h1>
        <div className="mb-6">
          <label for="username" className="mr-5" >Username</label>
          <input className="w-full mt-2 h-8 rounded p-2" type="text" id="username" name="username" value={loginUser.username} onChange={onChangeLoginFields} placeholder="John" required />
        </div>
        <div className="mb-6">
          <label for="password" className="mr-5" >Password</label>
          <input className="w-full mt-2 h-8 rounded p-2" type="password" value={loginUser.password} onChange={onChangeLoginFields} name="password" id="password" placeholder="•••••••••" required />
        </div> 
        <button type="submit" className="flex items-center justify-center m-auto bg-white text-black rounded-xl w-20 h-10 text-lg ">Submit</button>
      </div>
      <div className="mr-5 ">
        <h1 className="text-2xl text-bold text-center mb-10">Sign Up</h1>
        <div className="mb-6">
          <label for="username" className="mr-5" >Username</label>
          <input className="w-full mt-2 h-8 rounded p-2" type="text" id="username" name="username" value={signUpUser.username} onChange={onChangeSignUpFields} placeholder="John" required />
        </div>
        <div className="mb-6">
          <label for="password" className="mr-5" >Password</label>
          <input className="w-full mt-2 h-8 rounded p-2" type="password" value={signUpUser.password} onChange={onChangeSignUpFields} name="password" id="password" placeholder="•••••••••" required />
        </div>
        <div className="mb-6">
          <label for="password" className="mr-5" >Confirm Password</label>
          <input className="w-full mt-2 h-8 rounded p-2" type="password" value={signUpUser.password} onChange={onChangeSignUpFields} name="password" id="password" placeholder="•••••••••" required />
        </div> 
        <button type="submit" className="flex items-center justify-center m-auto bg-white text-black rounded-xl w-20 h-10 text-lg ">Submit</button>
      </div>
    </div>
  );
}

export default Home;