const BlogForm = (props) => (
    <div>
        <form onSubmit={props.onSubmit}>
            <h3>Add new blog</h3>
            <div>Title: <input 
                type="text"
                value={props.blog.title}
                onChange={({target})=>props.onChange({title: target.value, url: props.blog.url, author: props.blog.author})}
            /></div>
            <div>Author: <input 
                type="text"
                value={props.blog.author}
                onChange={({target})=>props.onChange({title: props.blog.title , url: props.blog.url, author: target.value})}
            /></div>
            <div>URL: <input
                type="text"
                value={props.blog.url}
                onChange={({target})=>props.onChange({title: props.blog.title, url: target.value, author: props.blog.author})}
            /></div>
            <div><input type="submit" value="Add"/></div>
        </form>
    </div>
)

export default BlogForm