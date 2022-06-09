import React from 'react'
import './App.css';
import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

function App() {
  const [searchTerm,setSearchTerm] = useState('');
  const [data,setData] = useState([])
  const debounceSearchTerm = useDebounce(searchTerm,300);

  useEffect(()=> {
    if (debounceSearchTerm){
      console.log('Search Term :' , debounceSearchTerm)
      fetchData(debounceSearchTerm)
    }else{
      console.log('Something else')
    }
  },[debounceSearchTerm])


  const fetchData = () => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => res.json())
    .then((response) => {
      console.log('Response', response)
      setData(response)
    })
  }

  const search = (data,key) => {
     for(let i=0; i<data.length; i++){
         if(data[i].name===key){
           return true;
         }
      
     }
     return false;
  }




  return (
    
    <div className="App">
       <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
       placeholder='write here..'></input>
       {
         search(data,searchTerm)?<h1>{searchTerm}</h1>:
         <h1>NO Data</h1>
       }
    </div>
  );
}

export default App;
