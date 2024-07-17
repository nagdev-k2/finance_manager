"use client";

import { ReactNode } from "react"
import Sidebar from "./sidebar";


interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => (
  <div className="flex justify-between">
    <Sidebar />
    <div className='bg-white h-[100vh] text-black p-5 w-full flex'>
      <div className="w-1/6" />
      <div className="w-5/6 overflow-scroll">
        {props.children}
      </div>
    </div>
  </div>
);

export default Layout;