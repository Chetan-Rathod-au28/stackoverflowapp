import React from 'react'
import { Link } from 'react-router-dom'
import { FilterList } from '@mui/icons-material'
import './MainComponent.css'
import AllQuestion from './AllQuestion'

const MainComponent = ({question}) => {
  return (
    <div className='main'>
      <div className='main-container'>
      <div className='main-top'>
        <h2>All Questions</h2>
        <Link to="/ask-question">
        <button >Ask Question</button>
        </Link>
      </div>
      <div className='main-desc'>
        <p>{question && question.length} Questions</p>
        <div className='main-filter'>
        <div className='main-tabs'>
        <div className='main-tab'>
          <Link>Newest</Link>
        </div>
        <div className='main-tab'>
          <Link>Active</Link>
        </div>
        <div className='main-tab'>
          <Link>More</Link>
        </div>
        </div>
        <div className='main-filter-item'>
          <FilterList />
          <p>Filter</p>
        </div>
        </div>
      </div>
      <div className="questions">
        {
          question.map((_q,index)=> (
            <> 
             <div key={index} className='question'>
             <AllQuestion question = {_q} />
             </div>
            </>
          ))
        }
     
      </div>
      </div>
    </div>
  )
}

export default MainComponent


