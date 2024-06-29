"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase';

const Dashboard = () => {
  const router = useRouter();
  const [allTransactions, setAllTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllTransactions = async () => {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    let data:any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({id: doc.id, name: doc.data().name})
    });
    setAllTransactions(data);
  }

  const getAllTypes = async () => {
    const querySnapshot = await getDocs(collection(db, "type"));
    let data:any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({id: doc.id, name: doc.data().name})
    });
    setTypes(data)
  }

  const getAllCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    let data:any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({id: doc.id, name: doc.data().name})
    });
    setCategories(data);
  }

  console.log("categories ===>", categories);
  console.log("types ===>", types);
  console.log("allTransactions ===>", allTransactions);
  

  useEffect(() => {
    if(!localStorage.getItem('userid')) {
      // router.push('/')
    }
    getAllCategories();
    getAllTransactions();
    getAllTypes();
  }, [])

  return (
    <div className='bg-white h-[100vh]'>
      <div>
        <h1>Add New Transaction</h1>
      </div>
      <div>
        <h1>All Transactions</h1>
      </div>
    </div>
  )
}

export default Dashboard; 