import './User.css'
export function User(props){
    return(
        <article>
            <section className='userActions'>
                <img src={props.image} alt="users image"/>
                <label htmlFor="comment">Comment</label>
                <textarea id='comment' type="text" name="comment" placeholder="Add a comment..."></textarea>
                <button>Send</button>                
            </section>
        </article>
    )
}