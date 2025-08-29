import './Comment.css'
export function Comment(props){
    const mappedReply=props.data?.replies?.map((reply)=>{
            return{
                id:reply.id,
                replyUsername:reply.user.username,
                createdAt:reply.createdAt
            }
        }
    ) 

    return(  
        <article className='commentSec'>
            {props.deleteWindow&&mappedReply.map((reply)=>(                           
                <section className={props.shownWindow} key={reply.id}>
                    <p className='username'>Delete Comment</p>
                    <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    <div>
                        <button
                            onClick={()=>props.windowDelete()}
                        >No,Cancel</button>
                        <button
                            onClick={()=>{
                                props.windowDelete()
                                props.deleteComment(props.data.id, reply.id)
                            }}
                        >Yes,Delete</button>
                    </div>
                </section>
                    
                ))
            }

            <section key={props.data.id} className='firstLevel'>
                <section>
                    <aside>
                        <button
                            onClick={()=>props.upVote(props.data.id, null)}
                        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
                        </button>                        
                        {props.data.score}                        
                        <button
                            onClick={()=>props.downVote(props.data.id, null)}
                        ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/></svg>
                        </button>
                    
                    </aside>
                    <section>
                        <section>
                             <div className='profile'>
                                <img src={props.data?.user?.image?.png} alt='avatar image'/>
                                <p className='username'>{props.data.user.username}</p>
                                <p className='time'>{props.data.createdAt}</p>
                            </div>
                            <div className='reply'>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M268.2 82.4C280.2 87.4 288 99 288 112L288 192L400 192C497.2 192 576 270.8 576 368C576 481.3 494.5 531.9 475.8 542.1C473.3 543.5 470.5 544 467.7 544C456.8 544 448 535.1 448 524.3C448 516.8 452.3 509.9 457.8 504.8C467.2 496 480 478.4 480 448.1C480 395.1 437 352.1 384 352.1L288 352.1L288 432.1C288 445 280.2 456.7 268.2 461.7C256.2 466.7 242.5 463.9 233.3 454.8L73.3 294.8C60.8 282.3 60.8 262 73.3 249.5L233.3 89.5C242.5 80.3 256.2 77.6 268.2 82.6z"/></svg>
                                    Reply
                                </button>                                
                            </div>
                        </section>                       
                        <p className='content'>{props.data.content}</p>
                    </section>                    
                </section>      
                    {props.data.replies&&props.data.replies.length>0?                        
                        props.data?.replies.map((reply)=>(
                        <section key={reply.id} className='replies'>
                            <aside>
                                <button
                                    onClick={()=>props.upVote(props.data.id, reply.id)}
                                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
                                </button>{reply.score}
                                <button
                                    onClick={()=>props.downVote(props.data.id, reply.id)}
                                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/></svg>
                                </button>
                            </aside>  
                            <section>
                                <section>
                                    <div className='profile'>
                                        <img src={reply.user.image.png} alt='avatar image'/>
                                        <p className='username'>{reply.user.username}</p>
                                        {props.username===reply.user.username?<p className='you'>you</p>:null}
                                        <p className='time'>{reply.createdAt}</p>
                                    </div>

                                    <div className='actions'>
                                        {props.username===reply.user.username?
                                            <div className='delete'>
                                                <button
                                                    onClick={()=>{
                                                        props.windowDelete()
                                                        }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                    <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
                                                    Delete
                                                </button>
                                            </div>:null}

                                        {props.username!==reply.user.username?
                                            <div className='reply'>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                    <path d="M268.2 82.4C280.2 87.4 288 99 288 112L288 192L400 192C497.2 192 576 270.8 576 368C576 481.3 494.5 531.9 475.8 542.1C473.3 543.5 470.5 544 467.7 544C456.8 544 448 535.1 448 524.3C448 516.8 452.3 509.9 457.8 504.8C467.2 496 480 478.4 480 448.1C480 395.1 437 352.1 384 352.1L288 352.1L288 432.1C288 445 280.2 456.7 268.2 461.7C256.2 466.7 242.5 463.9 233.3 454.8L73.3 294.8C60.8 282.3 60.8 262 73.3 249.5L233.3 89.5C242.5 80.3 256.2 77.6 268.2 82.6z"/></svg>
                                                    Reply
                                                </button>   
                                            </div>:
                                            <div className='edit'>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                    <path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"/></svg>
                                                    Edit
                                                </button>
                                            </div>
                                        }
                                    </div>                                    
                                </section>                       
                                <p className='content'><span className='replyTo'>@{reply.replyingTo}</span>{reply.content}</p>
                            </section>           
                        </section>        
                    ))                
                :null}
                </section>
        </article>
    )
}