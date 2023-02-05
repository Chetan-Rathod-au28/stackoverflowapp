import React from 'react'
import './index.css'
import MainComponent from './MainComponent'
import Sidebar from './Sidebar'

const index = () => {
  return (
    <div className="stack-index">
        <div className="stack-index-content">
            <Sidebar />
            <MainComponent />
        </div>
    </div>
  )
}

export default index