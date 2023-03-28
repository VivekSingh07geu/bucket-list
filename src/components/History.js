import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getBucketNames, { getHistoryNames } from '../api';
import "./History.css"
function History() {

  const [names , setNames] = useState([]);
  
  useEffect(() => {
    loadNames();
  }, []);
  
  const loadNames = () => getHistoryNames().then((name) => setNames(name.data));

  
  return (
    <>
      <div className='header'>
            <div className='left'>
                <div>
                    <Link to = "/" style={{ textDecoration: 'none' , color: "white" }}>
                        <a>
                        <span>Home</span>
                        </a>
                    </Link>
                </div>
                <div>
                    <Link to = "/history" style={{ textDecoration: 'none' , color: "white" }}>
                        <a>
                            <span>History</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>

        <div className = "bucket-list-history">

            {names ? (
                names.map(item => (
                    <div className='card-history'>
                        <div className='details'>
                        <p className='name'>{item.name}</p>
                        <p className='link'>{item.link}</p>
                        <p className='time'>{item.time}</p>
                        </div>
                    </div>
                ))
            ):(
                <>
                </>
            )}
        </div>
    </>
  )
}

export default History