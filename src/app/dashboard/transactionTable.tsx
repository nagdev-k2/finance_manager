"use client";
import { db } from "@/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface TransactionTableType {
  types: any;
  categories: any;
}

const TransactionTable = (props: TransactionTableType) => {
  const tableHead = ['S. No', 'Date', 'Source', 'Type', 'Category', 'Value', 'Comments', 'Edit', 'Delete']
  const [allTransactions, setAllTransactions] = useState([]);

  const findType = (id:string) => {
    return props.types ? props.types?.find((t:any) => t.id === id).name : "";
  }

  const findCategory = (id:string) => {
    return props.categories ? props.categories?.find((t:any) => t.id === id).name : "";
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

  useEffect(() => {
    getAllTransactions();
  }, [])

  console.log('allTransactions===>', allTransactions);
  
  const itemType = (key:string , value: any) => {
    
    switch(key) {
      case "type":
        return findType(value);
      case "category":
        return findCategory(value);
      case "date":
        return "date";
      default:
        return value;
    }
  }

  return(<div>
    <span className='text-lg font-bold'>All Transactions</span>
    <table className="w-full">
      <thead>
        <tr className="w-full border-b-2 border-grey-100">
          {tableHead.map((key, index) => (
            <th className="border-r-2 border-grey-100" key={`${key}-${index}-table-head`}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {allTransactions.map((transaction, index) => (
          <tr className="w-full border-b-2 border-grey-100 h-[40px]" key={`${index}-table-row`}>
            <td className="border-r-2 border-grey-100">{index+1}</td>
            {Object.keys(transaction).map((key, i) => (key != "id" && key!= "uid") && (
                <td className="border-r-2 border-grey-100" key={`transaction-${i}-${index}`}>{itemType(key, transaction[key])}</td>
            ))}
            <td className="border-r-2 border-grey-100" ><button>Edit</button></td>
            <td className="border-r-2 border-grey-100"><button>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>)
}

export default TransactionTable;