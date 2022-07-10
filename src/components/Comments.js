import {Avatar, Comment} from 'antd';

const Comments = ({comments}) => (
    (!comments)
        ? []
        : comments.map(comment => (
            <Comment
                key={comment.id + comment.text}
                author={<a>Han Solo</a>}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                content={<p>{comment.text}</p>}
            />
        ))
    )

export default Comments;