"use client";
import React, { useEffect, useState } from "react";
import { app } from '../firebase';
import Toast from "@/components/toast";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'


const Home = () => {
  const router = useRouter()

  const [loginUser, setLoginUser] = useState({ email: '', password: '' });
  const [signUpUser, setSignUpUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [toastMsg, setToastMsg] = useState({ msg: '', status: '' })

  useEffect(() => {
    if(localStorage.getItem('userid')) {
      // router.push('/dashboard');
    }
  }, [])

  const onChangeLoginFields = (e: { target: { name: string; value: string; }; }) => {
    setLoginUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const showToastMsg = (msg: string, status: string) => {
    setToastMsg({ msg, status })
    setTimeout(() => setToastMsg({msg: '', status: ''}), 3000)
  }

  const onChangeSignUpFields = (e: { target: { name: string; value: string; }; }) => {
    setSignUpUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const loginSubmit = async () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        localStorage.setItem("userid", user.uid);
        showToastMsg("Login Success", "success")
        router.push('/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showToastMsg(errorMessage, "danger")
      });
  }

  const signUpSubmit = async () => {
    if (signUpUser.password === signUpUser.confirmPassword) {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, signUpUser.email, signUpUser.password)
        .then(async (userCredential) => {
          // Signed up 
          const user = userCredential.user;
          localStorage.setItem("userid", user.uid);
          showToastMsg("Signup Success", "success")
          router.push('/dashboard')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          showToastMsg(errorMessage, "danger")
        });
    }
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center relative">
      <div className="mr-5 border-r-2 border-white p-5">
        <h1 className="text-2xl text-bold text-center mb-10">Login</h1>
        <div className="mb-6">
          <label className="mr-5" >Email</label>
          <input className="w-full mt-2 h-8 rounded p-2 text-black" type="text" id="email" name="email" value={loginUser.email} onChange={onChangeLoginFields} placeholder="John@abc.com" required />
        </div>
        <div className="mb-6">
          <label className="mr-5" >Password</label>
          <input className="w-full mt-2 h-8 rounded p-2 text-black" type="password" value={loginUser.password} onChange={onChangeLoginFields} name="password" id="password" placeholder="•••••••••" required />
        </div>
        <button onClick={loginSubmit} type="submit" className="flex items-center justify-center m-auto bg-white text-black rounded-xl w-20 h-10 text-lg ">Submit</button>
      </div>
      <div className="mr-5 ">
        <h1 className="text-2xl text-bold text-center mb-10">Sign Up</h1>
        <div className="mb-6">
          <label className="mr-5" >Email</label>
          <input className="w-full mt-2 h-8 rounded p-2 text-black" type="text" id="email" name="email" value={signUpUser.email} onChange={onChangeSignUpFields} placeholder="John" required />
        </div>
        <div className="mb-6">
          <label className="mr-5" >Password</label>
          <input className="w-full mt-2 h-8 rounded p-2 text-black" type="password" value={signUpUser.password} onChange={onChangeSignUpFields} name="password" id="password" placeholder="•••••••••" required />
        </div>
        <div className="mb-6">
          <label className="mr-5" >Confirm Password</label>
          <input className="w-full mt-2 h-8 rounded p-2 text-black" type="password" value={signUpUser.confirmPassword} onChange={onChangeSignUpFields} name="confirmPassword" id="confirmPassword" placeholder="•••••••••" required />
        </div>
        <button onClick={signUpSubmit} type="submit" className="flex items-center justify-center m-auto bg-white text-black rounded-xl w-20 h-10 text-lg ">Submit</button>
      </div>
      <Toast msg={toastMsg.msg} status={toastMsg.status} />
    </div>
  );
}

export default Home;