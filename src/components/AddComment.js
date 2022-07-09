import { Avatar, Button, Comment, Form, Input } from 'antd';
import {useState} from 'react';
import {createComment} from "../http/commentApi";
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const AddComment = ({currentUser, itemId, newCommentAdded}) => {
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = async (e) => {
        debugger
        e.preventDefault()
        if (!value) return;
        setSubmitting(true);
        await createComment({
            text: value,
            userId: currentUser.id,
            itemId: itemId
        });
            setSubmitting(false);
            setValue('');
        newCommentAdded();
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </>
    );
};

export default AddComment;