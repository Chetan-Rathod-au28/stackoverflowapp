import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TagsInput } from 'react-tag-input-component';
import './Question.css';
import {useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectUser} from '../../state/reducers/userSlice'
import axios from 'axios';

const Question = () => {
    const user = useSelector(selectUser)
    const[loading,setLoading] = useState(false)
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [tags,setTags]=useState([])
    const history = useHistory()
    const handleQuill = (value) => {setBody(value)}
    const handleSubmit =async (e) => {
        e.preventDefault()
        if(title !== "" && body!==""){
            const bodyJson = {
                title:title,
                body:body,
                tag:tags,
                user:user

            }
            await axios.post('/api/v1/question',bodyJson).then((res)=>{
                alert('Question added successfully')
                setLoading(false)
                history.push("/")
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    // console.log(tags)
  return (
    <div className='ask-question'>
        <div className='ask-question-container'>
        <div className='head-title'>
            <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
            <div className="question-options">
            <div className="question-option">
                <div className="title">
                    <h3>Title</h3>
                    <small>Be specific and imagine you’re asking a question to another person.</small>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text"  placeholder='e.g.Is there an R function for finding the index of an element in a vector?'/>
                </div>
            </div>
            <div className="question-option">
                <div className="title">
                    <h3>What are the details of your problem?</h3>
                    <small>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</small>
                    <ReactQuill value = {body} onChange={handleQuill} className='react-quill' theme='snow' />
                </div>
            </div>
            <div className="question-option">
            <div className="title">
                    <h3>Tags</h3>
                    <small>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</small>
                    <TagsInput value={tags} onChange={setTags} name='tags' placeHolder='Press enter to add new tag'/>
                </div>
            </div>
            </div>
        </div>
        <button disabled={loading} type='submit' onClick={handleSubmit} className='button'>{loading? 'Adding question' :'Add your question'}</button>
        </div>
    </div>

  )
}

export default Question