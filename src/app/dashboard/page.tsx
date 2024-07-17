"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import ApexCharts from 'apexcharts'
import { db } from '@/firebase';
import Layout from '../../components/layout';
import Chart from "react-apexcharts";

const Dashboard = () => {
  const router = useRouter();
  const [allTransactions, setAllTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [donut, setDonut] = useState({options: {}, series: []})
  const [monthlyExp, setMonthlyExp] = useState({})

  const categoriesSum = () => {
    let firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getTime();
    let lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getTime();
    
    const catSum:{[key: string]: number} = {}
    allTransactions.map((transaction: any) => {
      let msec = transaction.date.seconds*1000      
      if( msec < lastDay && msec >firstDay && transaction.type == "wewUxLkEikvylz0VVyM2") { // wewUxLkEikvylz0VVyM2 outgoing 
        if(Object.keys(catSum).includes(transaction.category))
          catSum[transaction.category] += parseFloat(transaction.value)
        else
          catSum[transaction.category] = parseFloat(transaction.value)
      }
    })
    return catSum;
  }

  const generateDonut = () => {
    const data = categoriesSum()
    const xaxis = Object.keys(data)
    const yaxis = Object.values(data)
    let labels: any[] = [];
    xaxis.map((id) => {
      let category: any = categories.find((cat: any) => cat.id === id)
      if(category) {
        labels.push(category.name)
        delete Object.assign(data, {[category.name]: data[id] })[id];
      }
    })
    setMonthlyExp(data);
    let donut = {
      options: {
        chart: {
          id: "monthlyDonut"
        },
        labels,
      },
      series: yaxis,
    }
    setDonut(donut)
  }

  const getAllTypes = async () => {
    const querySnapshot = await getDocs(collection(db, "type"));
    let data:any = [];
    let i = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({id: doc.id, name: doc.data().name})
      i++;
    });
    setTypes(data)
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
      data.push({id: doc.id, name: doc.data().name})
      i++;
    });
    setCategories(data);
  }

  useEffect(() => {
    if(!localStorage.getItem('userid')) {
      router.push('/')
    }
    getAllCategories();
    getAllTypes();
    getAllTransactions();
  }, [])

  useEffect(() => {
    generateDonut();
  }, [allTransactions])

  let totalExp: number = Object.values(monthlyExp).reduce((a: number, b: number) => a + b, 0);
  
  return (
    <Layout>
      <div>
        <h1>Monthly Report</h1>
        <h3>Total Expenses: {parseInt(totalExp)}</h3>
        {Object.keys(monthlyExp).map((key) => (
          <h3 key={`category-${key}`}>{key}: {monthlyExp[key]}</h3>
        ))}
      </div>

      <Chart
        options={donut.options}
        series={donut.series}
        type="donut"
        width="500"
      />
    </Layout>
  );
};

export default Dashboard; 