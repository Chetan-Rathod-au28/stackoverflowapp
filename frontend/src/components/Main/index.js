import axios from 'axios'
import React,{useState,useEffect} from 'react'
import './index.css'
import MainComponent from './MainComponent'
import Sidebar from './Sidebar'

const Index = () => {
  const[question,setQuestion] = useState([])
  useEffect(() => {
    const getQuestion = async () => {
        await axios.get('/api/v1/question').then((res)=> {
        console.log(res)
        setQuestion(res.data.reverse())
      }).catch((err)=>{
        console.log(err)
      })
    }
    getQuestion();
      
  },[])

  return (
    <div className="stack-index">
        <div className="stack-index-content">
            <Sidebar />
            <MainComponent question={question} />
        </div>
    </div>
  )
}

export default Index