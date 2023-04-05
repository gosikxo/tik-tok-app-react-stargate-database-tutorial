import React, { useEffect, useState, useRef, useMemo } from 'react'
import { FollowersColumn } from '../components/FollowersColumn'
import axios from 'axios'
import Card from '../components/Card'
import MiniCard from '../components/MiniCard'

export const Home = () => {
    const [users, setUsers] = useState(null)

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

    const descendingUsers = useMemo(() => {
        if (users) {
            return users.sort((a, b) => a.id < b.id ? 1 : -1)
        }
        return [];
    }, [users])

    const topFiveFollowing = useMemo(() => {
        if (users) {
            const following = users.filter(user => user.is_followed === true)
            const descendingFollowing = following.sort((a, b) => a.likes < b.likes ? 1 : -1)
            return descendingFollowing.slice(0, 5)
        }
        return [];
    }, [users])

    const topFiveNotFollowing = useMemo(() => {
        if (users) {
            const notFollowing = users.filter(user => user.is_followed === false)
            const descendingNotFollowing = notFollowing.sort((a, b) => a.likes < b.likes ? 1 : -1)
            return descendingNotFollowing.slice(0, 5)
        }
        return [];
    }, [users])

    return (
        <>
            {descendingUsers && (
                <div className='container'>
                    <FollowersColumn users={topFiveFollowing} />
                    <div className='feed'>
                        {descendingUsers.map((descendingUser, index) => (
                            <Card
                                key={index}
                                user={descendingUser}
                            />
                        ))}
                    </div>
                    <div className='suggested-box'>
                        <div className='section'>
                            <div className='suggested'>
                                <h2 className='bold'>Suggested accounts</h2>
                                <div className='break'>
                                    {users && topFiveNotFollowing.map((NotFollowingUser, index) => (
                                        <MiniCard
                                            key={index}
                                            user={NotFollowingUser}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
