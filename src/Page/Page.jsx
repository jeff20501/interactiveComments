import './Page.css'
import { Comment } from '../components/Comment/Comment'
import {User} from '../components/User/User'
import { useEffect, useState } from 'react'
export function Page(){
    //states
    const [comments, setComments]=useState([]) 
    const [user, setUser] = useState({})
    
    //fetch data
    useEffect(()=>{
        
            const fetchData =async()=>{
                try{
                    const res = await fetch('/data.json')
                    const comments = await res.json()
                    setComments(comments.comments)
                    setUser(comments.currentUser)
                }catch(error){
                    console.error(error)
                }
            }
            fetchData()        
    }, [])
    
    //array
    const commentData = comments?.map((data)=>{ //only look when data comments exists with optional chaining
        return(
            <Comment
                key={data.id}
                id={data.id}
                data={data}
                user={user.username}
            />
        )
        
    })  
    
    return(
        <>
            <article className='wrapper'>
                {commentData}
                <User
                    image={user?.image?.png}
                />
            </article>
            
        </>
        
    )
}