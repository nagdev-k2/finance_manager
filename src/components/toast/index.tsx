"use client";
import React, { useState, useEffect } from 'react';

interface ToastType {
  msg: string;
  status: string;
}

const Toast = (props: ToastType) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.msg) {
      setShow(true);
      setTimeout(() => setShow(false), 3000)
    }
    else setShow(false)
  }, [props.msg])
  let toastClass = "absolute right-2 bottom-2 flex text-white items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
  if(props.status == "danger") toastClass += " bg-red-300";
  if(props.status == "success") toastClass += " bg-green-500";


  return show ? (
    <div id="toast-default" className={toastClass} role="alert">
      <div className="ms-3 text-sm font-normal">{props.msg}</div>
    </div>
  ) : <div />
};

export default Toast;