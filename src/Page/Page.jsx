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
    const [upVoted, setUpVoted] = useState(new Set())
    const [downVoted, setDownVoted] = useState(new Set())
    
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

    useEffect(()=>{
        document.body.style.overflow=deleteWindow?"hidden":"auto"
    })

    //function
    const overlay=clsx('overlay',
        deleteWindow?"shown":null
    )

    const shownWindow=clsx('deleteWindow',
        deleteWindow?'shown':null
    )

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

    const upVote=(comId, replyId=null)=>{
        const key = replyId?`reply-${replyId}`:`com-${comId}`
        //if upvoted has the key do nothing
        if(upVoted.has(key)) {
            return
        }
        //else do this
        setComments(prevComment=>prevComment.map((comment)=>{
            if(replyId===null){ //look if we are upvote a reply or comment
                if(comId===comment.id){ //upvote a comment
                    return{
                        ...comment,
                        score:comment.score+1,
                        upVote:true
                    }
                                    
                }
                return comment            
            }
        
            if(comId===comment.id){ //upvote reply in a comment
                return{
                    ...comment,
                    replies:comment.replies.map(reply=>(
                        reply.id===replyId?{...reply, score:reply.score+1, upvote:true}:reply
                    ))
                }
            }       
            return comment
        }))
        //now track the keys and update if needed
        setUpVoted(preVoted=>new Set(preVoted).add(key))
    }

    const downVote=(comId, replyId)=>{
        const key=replyId?`downreply-${replyId}`:`downcom-${comId}`
        //if upvoted has the key do nothing
        if(downVoted.has(key)) {
            return
        }

        //else do this
        setComments(prevComment=>prevComment.map((comment)=>{
            if(replyId===null){
                if(comId===comment.id){
                    return{
                        ...comment,
                        score:comment.score-1
                    }
                }
                return comment
            }
            if(comId===comment.id){
                return{
                    ...comment,
                    replies:comment.replies.map(reply=>(
                        reply.id===replyId?{...reply, score:reply.score-1}:reply
                    ))
                }
            }
            return comment
        }))
        setDownVoted(preVoted=>new Set(preVoted).add(key))
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
                shownWindow={shownWindow}
                deleteComment={deleteComment}
                upVote={upVote}
                downVote={downVote}
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