import React, { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom'
import './index.css'
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'
import { selectUser } from '../../state/reducers/userSlice';

const MainQuestion = () => {
  const [show, setShow] = useState(false);
  const[answer,setAnswer]=useState('');
  const [comment,setComment]=useState("")
  const[questionData,setQuestionData] = useState()
  const user = useSelector(selectUser)

  let search = window.location.search
  const params = new URLSearchParams(search)
  const id = params.get("q")

  const handleQuill = (value) => {
    setAnswer(value)
  }

 useEffect(() => {
    const getQuestionDetails = async() => {
    await axios.get(`/api/v1/question/${id}`).then((res)=>{
      setQuestionData(res.data[0])
    }).catch((err)=> {
      console.log(err)
    })
   }
 
   getQuestionDetails()
 }, [id])

 const getUpdatedAnswer = async() => {
  await axios.get(`/api/v1/question/${id}`).then((res)=>{
    setQuestionData(res.data[0])
  }).catch((err)=> {
    console.log(err)
  })
 }

 const handleSubmit = async () => {
  if(answer !== ""){
    const body = {
      question_id:id,
      answer: answer,
      user : user
    }
    const config = {
      headers: {
        "Content-Type":"application/json"
      }
    }
    await axios.post("/api/v1/answer",body,config).then((res) => {
      console.log(res.data)
      alert('Answer Added Successfully')
      setAnswer("")
      getUpdatedAnswer()
    }).catch((err)=>console.log(err))
  }
}
const handleComment = async() => {
  if(comment !==""){
    const body = {
      question_id:id,
      comment:comment,
      user:user
    }
    await axios.post(`/api/v1/comment/${id}`,body).then((res)=>{
      console.log(res.data)
      setComment("")
      setShow(false)
      getUpdatedAnswer()
    })
  }
}
  
  return (
    <div className='main'>
      <div className='main-container'>
        <div className='main-top'>
          <h2 className='main-question'>{questionData?.title}</h2>
          <Link to='ask-question'>
            <button>Ask Question</button>
          </Link>
        </div>
        <div className='main-desc'>
          <div className='info'>
            <p>{new Date(questionData?.created_at).toLocaleString()}</p>
            <p>Active<span>today</span></p>
            <p>Viewed<span>43 Times</span></p>
          </div>
        </div>
        <div className='all-questions'>
          <div className='all-questions-container'>
            <div className="all-questions-left">
              <div className="all-options">
                <p className='arrow'>▲</p>
                <p className='arrow'>0</p>
                <p className='arrow'>▼</p>
                <BookmarkIcon />
                <HistoryIcon />
              </div>
            </div>
            <div className='question-answer'>
              <p>{ReactHtmlParser(questionData?.body)}</p>
              <div className="author">
                <small>Asked {new Date(questionData?.created_at).toLocaleString()}</small>
                <div className="auth-details">
                  <Avatar src={questionData?.user?.photo}/>
                  <p>{questionData?.user?.displayName ? questionData?.user?.displayName : String(questionData ?.user?.email).split('@')[0]}</p>
                </div>
              </div>
              <div className="comments">
                {
                  questionData?.comments && questionData?.comments?.map((_qd)=><p>{_qd?.comment} - <span>{_qd?.user?.displayName 
                  ? _qd?.user?.displayName 
                  : String(_qd ?.user?.email).split('@')[0]}</span>
                  <small>{new Date(_qd?.created_at).toDateString()}</small>
                </p>
                  )
                }
                <div className="comment">
                  
                  <p onClick={() => setShow(!show)}>Add a comment</p>
                  {show && (<div className='title'>
                    <textarea value={comment} onChange = {(e)=> setComment(e.target.value)} type='text' placeholder='Add your comment...' rows={5}  style={{margin: "5px 0px",
                padding:"10px", borderRadius:"3px",outline:"none"}}></textarea>
                    <button onClick={handleComment}>Add a comment</button>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div style={{flexDirection:"column"}} className='all-questions'>
          <p style={{marginBottom:"10px",fontSize:"1.3rem",fontWeight:"300"}}>{questionData?.answerDetails?.length} Answer(s)</p>
          {
            questionData?.answerDetails?.map((_q) => ( <div key={_q?._id} className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className='arrow'>▲</p>
                <p className='arrow'>0</p>
                <p className='arrow'>▼</p>
                <BookmarkIcon />
                <HistoryIcon />
              </div>
            </div>
            <div className='question-answer'>
              <p style={{maxWidth:"700px"}}>{ReactHtmlParser(_q?.answer)}</p>
              <div className="author">
                <small>Asked {new Date(_q?.created_at).toLocaleString()}</small>
                <div className="auth-details">
                  <Avatar src={_q?.user?.photo}/>
                  <p>{_q?.user?.displayName ? _q?.user?.displayName : String(_q ?.user?.email).split('@')[0]}</p>
                </div>
              </div>
            </div>
          </div>))
          }
         
        </div>
      </div>
      <div className="main-answer">
        <h3>Your Answer</h3>
        <ReactQuill value={answer} onChange={handleQuill} className='react-quill' theme='snow' style={{ height: "250px",marginBottom:"50px"}} />
      </div>
        <button type='submit' onClick={handleSubmit}>Post Your Answer</button>
    </div>
  )
}

export default MainQuestion