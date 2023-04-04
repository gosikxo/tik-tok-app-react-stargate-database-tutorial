import React, { useEffect, useState } from 'react'
import { FollowersColumn } from '../components/FollowersColumn'
import axios from 'axios'

export const Home = () => {
    const [users, setUsers] = useState(null)

    const addData = async () => {
        await axios.post('/.netlify/functions/addData')
    }

    const fetchData = async () => {
        const results = await axios.get('/.netlify/functions/posts')
        console.log(results.data)
        setUsers(results.data)
    }

    useEffect(() => {
        addData()
        fetchData()
    }, [])

    return (
        <div className='container'>
            <FollowersColumn />
            <div className='feed'>
                <h1>Home</h1>
            </div>
            <div className='suggested-box'></div>
        </div>
    )
}
