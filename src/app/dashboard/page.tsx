"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/firebase';
import { Timestamp } from "@firebase/firestore";
import Toast from '@/components/toast';
import TransactionTable from './transactionTable';

const Dashboard = () => {
  const router = useRouter();
  const [transaction, setTransaction] = useState({ type: '', category: '', uid: localStorage.getItem("userid"), date: Date(), source: '', value: 0, comments: 'N.A.' })
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toastMsg, setToastMsg] = useState({msg: '', status: ''})

  const getAllTypes = async () => {
    const querySnapshot = await getDocs(collection(db, "type"));
    let data:any = [];
    let i = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if(i == 0) setTransaction((prevState) => ({...prevState, type: doc.id}))
      data.push({id: doc.id, name: doc.data().name})
      i++;
    });
    setTypes(data)
  }

  const getAllCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    let data:any = [];
    let i = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if(i == 0) setTransaction((prevState) => ({...prevState, category: doc.id}))
      data.push({id: doc.id, name: doc.data().name})
      i++;
    });
    setCategories(data);
  }

  const handleTransactionChange = (e:any) => {
    setTransaction((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleAddTransaction = async () => {
    await addDoc(collection(db, "transactions"), {
      ...transaction,
      date: Timestamp.fromDate(new Date(transaction.date))
    }).then((res) => {
      setToastMsg({msg: 'Added Successfully', status: 'success'})
    })

  }

  useEffect(() => {
    if(!localStorage.getItem('userid')) {
      router.push('/')
    }
    getAllCategories();
    getAllTypes();
  }, [])

  return (
    <div className='bg-white h-[100vh] text-black p-5'>
      <div className='mb-10 border-b-2 border-grey-100 pb-4'>
        <div className='text-lg font-bold pb-2'>Add New Transaction</div>
        <div className='flex items-end'>
          <div className='mr-5'>
            <label>Type: </label>
            <select className='border-2 rounded-xl p-2 w-full' name="type" onChange={handleTransactionChange}>
              {types.map((type:any) => <option key={type.id} value={type.id}> {type.name} </option>)}
            </select>
          </div>
          <div className='mr-5'>
            <label>Categories: </label>
            <select className='border-2 rounded-xl p-2 w-full' name="category" onChange={handleTransactionChange}>
              {categories.map((category:any) => <option key={category.id} value={category.id}> {category.name} </option>)}
            </select>
          </div>
          <div className='mr-5'>
            <label>Date: </label>
            <input type='date' className='border-2 rounded-xl p-2 w-full' name="date" value={transaction.date} onChange={handleTransactionChange} />
          </div>
          <div className='mr-5'>
            <label>Source: </label>
            <input type='text' className='border-2 rounded-xl p-2 w-full' name="source" value={transaction.source} onChange={handleTransactionChange} />
          </div>
          <div className='mr-5'>
            <label>Value: </label>
            <input type='number' className='border-2 rounded-xl p-2 w-full' name="value" value={transaction.value} onChange={handleTransactionChange} />
          </div>
          <div className='mr-5'>
            <label>Comments: </label>
            <input type='text' className='border-2 rounded-xl p-2 w-full' name="comments" value={transaction.comments} onChange={handleTransactionChange} />
          </div>
          <button className='bg-black text-white rounded-xl w-[100px] h-[50px]' type="submit" onClick={handleAddTransaction}> + Add </button>
        </div>
      </div>
      <TransactionTable types={types} categories={categories} />
      <Toast msg={toastMsg.msg} status={toastMsg.status} />
    </div>
  )
}

export default Dashboard; 