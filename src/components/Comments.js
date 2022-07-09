import {Avatar, Comment} from 'antd';

const Comments = ({comments, showReplyTo}) => (
    (!comments)
        ? []
        : comments.map(comment => (
            <Comment
                actions={(showReplyTo) ? [<span key="comment-nested-reply-to">Reply to</span>] : []}
                author={<a>Han Solo</a>}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                content={<p>{comment.text}</p>}
            />
        ))
    )

export default Comments;