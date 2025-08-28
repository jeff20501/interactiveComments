import './Page.css'
import { Comment } from '../components/Comment/Comment'
import {User} from '../components/User/User'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
export function Page(){
    //states
    const [comments, setComments]=useState([]) 
    const [user, setUser] = useState({})
    const [deleteWindow, setDeleteWindow]=useState(false)
    
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

    //function
    const overlay=clsx('overlay',
        deleteWindow?"shown":null
    )

    console.log(overlay)
    console.log(deleteWindow)

    const windowDelete=()=>{
        setDeleteWindow(prevState=>!prevState)
    }

    const deleteComment=(comid, replyId=null)=>{
        setComments(prevComment=>prevComment.map((comment)=>{
            if(replyId===null){ //remove top level comments
                if(comid===comment.id){
                    return null 
                }
                return comment
            }            
            if(comment.id===comid){ //remove replies nested inside comments
                return({
                    ...comment,
                    replies: comment.replies.filter(reply=>reply.id!==replyId)
                })
            }
            return comment
        }).filter(Boolean)) //remove false values
    }

    //array
    const commentData = comments?.map((data)=>{ //only look when data comments exists with optional chaining
        return(
            <Comment
                key={data.id}
                id={data.id}
                data={data}
                username={user.username}
                windowDelete={windowDelete}
                deleteWindow={deleteWindow}
                deleteComment={deleteComment}
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
                <div className={overlay}></div>  
            </article>
            
        </>
        
    )
}