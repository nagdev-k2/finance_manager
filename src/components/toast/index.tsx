"use client";
import React, { useState, useEffect } from 'react';

const Toast = (toast: { msg: string, status: string }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (toast.msg) setShow(true);
    else setShow(false)
  }, [toast.msg])
  let toastClass = "absolute right-2 bottom-2 flex text-white items-center w-full max-w-xs p-4 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
  if(toast.status == "danger") toastClass += " bg-red-300";
  if(toast.status == "success") toastClass += " bg-green-500";


  return show ? (
    <div id="toast-default" className={toastClass} role="alert">
      <div className="ms-3 text-sm font-normal">{toast.msg}</div>
    </div>
  ) : <div />
};

export default Toast;