import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./AllQuestion.css"

const AllQuestion = () => {
  return (
    <div className='all-questions'>
        <div className='all-questions-container'>
        <div className='all-questions-left'>
        <div className='all-options'>
        <div className='all-option'>
            <p>0</p>
            <span>Votes</span>
        </div>
        <div className='all-option'>
            <p>0</p>
            <span>Answers</span>
        </div>
        <div className='all-option'>
            <small>0 Views</small>
        </div>
        </div>
        </div>
        <div className="question-answer">
            <Link to='question'>Why blank use in attribute in anchor tag?</Link>
            <div style={{width:"90%"}}>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, animi corrupti? Accusamus?</div>
            </div>
        <div style={{display:"flex"}}>
            <span className='question-tags'>
                react
            </span>
            <span className='question-tags'>
                antd
            </span>
            <span className='question-tags'>
                frontend
            </span>
        </div>

        <div className='author'>
            <small>Timestamp</small>
            <div className='author-details'>
                <Avatar />
                <p>User Name</p>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default AllQuestion