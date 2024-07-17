"use client";
import React from "react";

interface TransactionTableType {
  types: any;
  categories: any;
  allTransactions: any;
  setTransaction: Function;
  setToastMsg: Function;
  deleteTransaction: Function;
}

const TransactionTable = (props: TransactionTableType) => {
  const tableHead = ['S. No', 'Date', 'Source', 'Type', 'Category', 'Value', 'Comments', 'Edit', 'Delete']

  const findType = (id:string) => {
    return props.types ? props.types?.find((t:any) => t.id === id)?.name : "";
  }

  const findCategory = (id:string) => {
    return props.categories ? props.categories?.find((t:any) => t.id === id)?.name : "";
  }

  const itemType = (key:string , value: any) => {
    switch(key) {
      case "type":
        return findType(value);
      case "category":
        return findCategory(value);
      case "date":
        return new Date(value.seconds * 1000).toDateString();
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
        {props.allTransactions.map((transaction, index) => (
          <tr className="w-full border-b-2 border-grey-100 h-[40px]" key={`${index}-table-row`}>
            <td className="border-r-2 border-grey-100">{index+1}</td>
            {tableHead.map((key, i) => Object.keys(transaction).includes(key.toLowerCase()) && (
              <td className="border-r-2 border-grey-100" key={`transaction-${i}-${index}`}>
                {itemType(key.toLowerCase(), transaction[key.toLowerCase()])}
              </td>
            ))}
            <td className="border-r-2 border-grey-100" ><button onClick={() => props.setTransaction(transaction)}>Edit</button></td>
            <td className="border-r-2 border-grey-100"><button onClick={() => props.deleteTransaction(transaction?.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>)
}

export default TransactionTable;