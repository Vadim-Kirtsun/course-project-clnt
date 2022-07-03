import { Avatar, Comment } from 'antd';

const ExampleComment = ({ children, comments }) => (
    <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure).
            </p>
        }
    >
        {children}
    </Comment>
);

const Comments = () => (
    <ExampleComment>
    </ExampleComment>
);

export default Comments;