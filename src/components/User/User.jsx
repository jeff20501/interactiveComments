import './User.css'
export function User(props){
    return(
        <article>
            <section className='userActions'>
                <form action={props.addComment} className='form'>
                    <img src={props.image} alt="users image"/>
                    <label htmlFor="comment">Comment</label>
                    <textarea id='comment' type="submit" name="comment" placeholder="Add a comment..."></textarea>
                    <button>Send</button>
                </form>                               
            </section>
        </article>
    )
}