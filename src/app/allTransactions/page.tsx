"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, doc, updateDoc, query, where, deleteDoc } from "firebase/firestore";
import { db } from '@/firebase';
import { Timestamp } from "@firebase/firestore";
import Toast from '@/components/toast';
import TransactionTable from '../../containers/transactionTable';
import NewTransaction from '../../containers/newTransaction';
import Layout from '../../components/layout';

let newDate = new Date()
let month = newDate.getMonth()+1 < 10 ? `0${newDate.getMonth()+1}` : newDate.getMonth()+1
let date = `${newDate.getFullYear()}-${month}-${newDate.getDate()}`
const initialTransactionState = { id: '', type: '', category: '', uid: localStorage.getItem("userid"), date:date, source: '', value: 0, comments: 'N.A.' }

const Dashboard = () => {
  const router = useRouter();
  const [transaction, setTransaction] = useState(initialTransactionState)
  const [allTransactions, setAllTransactions] = useState([]);
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

  const handleEditTransaction = (transaction: any) => {
    setTransaction(transaction);
    let transactionDate = new Date(transaction.date.seconds*1000)
    let month = transactionDate.getMonth()+1 < 10 ? `0${transactionDate.getMonth()+1}` : transactionDate.getMonth()+1
    let date = `${transactionDate.getFullYear()}-${month}-${transactionDate.getDate()}`
    handleTransactionChange({target: {name: 'date', value: date}})
  }

  const deleteTransaction = async (id:string) => {
    if (confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "transactions", id)).then((res) => {
        setToastMsg({msg: 'Transaction Deleted', status: 'success'});
        getAllTransactions();
      })
    }
  }

  const getAllTransactions = async () => {
    const querySnapshot = await getDocs(query(collection(db, "transactions"), where("uid", "==", localStorage.getItem("userid"))));
    let data:any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({id: doc.id, ...doc.data()})
    });
    setAllTransactions(data);
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
    let result = null;
    const clone = (({ id, ...o }) => o)(transaction)
    let date = Timestamp.fromDate(new Date(`${transaction.date} `));
    if (transaction.id) {
      result = await updateDoc(doc(db, "transactions", transaction.id), {...clone, date}).then((res) => {
        setToastMsg({msg: 'Updated Successfully', status: 'success'})
        setTransaction(initialTransactionState)
        getAllTransactions();
      }).catch((e) => {
        setToastMsg({msg: e.message, status: 'danger'})
      })
    } else {
      result = await addDoc(collection(db, "transactions"), {...clone, date}).then((res) => {
        setToastMsg({msg: 'Added Successfully', status: 'success'})
        setTransaction(initialTransactionState)
        getAllTransactions();
      }).catch((e) => {
        setToastMsg({msg: e.message, status: 'danger'})
      })
    }
  }

  useEffect(() => {
    if(!localStorage.getItem('userid')) {
      router.push('/')
    }
    getAllCategories();
    getAllTypes();
    getAllTransactions();
  }, [])

  return (
    <Layout>
      <>
        <NewTransaction
          transaction={transaction}
          handleAddTransaction={handleAddTransaction}
          handleTransactionChange={handleTransactionChange}
          types={types}
          categories={categories}
        />
        <TransactionTable
          types={types}
          categories={categories}
          allTransactions={allTransactions}
          setTransaction={handleEditTransaction}
          setToastMsg={setToastMsg}
          deleteTransaction={deleteTransaction}
        />
        <Toast msg={toastMsg.msg} status={toastMsg.status} />
      </>
    </Layout>
  );
};

export default Dashboard; 