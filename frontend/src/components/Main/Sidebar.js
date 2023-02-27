import React from 'react'
import { Public, Star, Work } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
    return (
        <>
        <div className='sidebar'>
            <div className="sidebar-container">
                <div className="sidebar-options">
                <div className="sidebar-option">
                    <Link to="/#">Home</Link>
                </div>
                <div className="sidebar-option">
                    <Link to="/#" >PUBLIC</Link>
                <div className="link">
                  <div className="link-tag">
                    <Public />
                    <Link to="/#">Question</Link>
                  </div>
                  <div className="tags">
                    <p>Tags</p>
                    <p>Users</p>
                    <p>Companies</p>                 
                  </div>
                   </div>
                   </div>
                   <div className="sidebar-option">
                    <p>COLLECTIVES</p>
                    <div className="link">
                  <div className="link-tag">
                    <Star />
                    <Link to="/#">Explore Collectives</Link>
                  </div>
                   </div>
                   <div className="sidebar-option">
                    <p >FIND A JOB</p>
                <div className="link">
                  <div className="link-tag">
                    <p>Jobs</p>
                    <p>Companies</p>
                  </div>
                   </div>
                   </div>
                   <div className="sidebar-option">
                    <Link to="/#" >TEAMS</Link>
                <div className="link">
                  <div className="link-tag">
                    <Work />
                    <Link to="/#" >Create free Team</Link>
                  </div>
                   </div>
                   </div>
                 </div>
              </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar

