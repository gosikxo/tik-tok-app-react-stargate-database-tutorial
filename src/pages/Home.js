import React, { useEffect, useState } from 'react'
import { FollowersColumn } from '../components/FollowersColumn'
import axios from 'axios'
import Card from '../components/Card'

export const Home = () => {
    const [users, setUsers] = useState(null)
    let descendingUsers

    const addData = async () => {
        await axios.post('/.netlify/functions/addData')
    }

    const fetchData = async () => {
        const results = await axios.get('/.netlify/functions/posts')
        setUsers(results.data)
    }

    useEffect(() => {
        addData()
        fetchData()
    }, [])

    if (users) {
        descendingUsers = users.sort((a, b) => a.id < b.id ? 1 : -1)
    }

    return (
        <>
            {descendingUsers && (
                <div className='container'>
                    <FollowersColumn />
                    <div className='feed'>
                        {descendingUsers.map((descendingUser, index) => {
                            <Card
                                key={index}
                                user={descendingUser}
                            />
                        })}
                    </div>
                    <div className='suggested-box'>
                        <div className='section'>
                            <div className='suggested'>
                                <h2 className='bold'>Suggested accounts</h2>
                                <div className='break'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
