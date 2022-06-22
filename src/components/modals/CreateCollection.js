import React, {useState} from 'react';
import {Form, Input, Select, Modal} from 'antd';
import TextArea from "antd/es/input/TextArea";
import UploadImage from "../UploadImage";
import AddField from "../AddField";
import {createCollection} from "../../http/collectionApi";


const CreateCollection = ({visible, setVisible}) => {
    const { Option } = Select;
    const subjects = ["Airplane", "Car", "Moto"];
    const [field, setField] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const addField = () => {
        setField([...field, {id: Date.now(), title: ''}])
    }
    const removeField = (id) => {
        setField(field.filter(f => f.id !== id))
    }
    const hideModal = (e) => {
        e.preventDefault()
        setVisible(false);
    };

    const submitCollection = async (e) => {
        e.preventDefault()
        debugger
        const data = await createCollection({name, description, subject});
        setVisible(false);
    };

    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChange = (value) => {
        setSubject(value);
    };

    return (
        <Modal
            title="Add New Collection"
            visible={visible}
            onOk={submitCollection}
            onCancel={hideModal}
        >
            <Form
            labelCol={{
            span: 4,
        }}
            wrapperCol={{
            span: 14,
        }}
            layout="horizontal"
            initialValues={{
            size: componentSize,
        }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            >
            <Form.Item label="Name">
            <Input
                value={name}
                onChange={e => setName(e.target.value)}
            />
            </Form.Item>
            <Form.Item label="Description">
            <TextArea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            </Form.Item>
            <Form.Item label="Subject">
                <Select
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                >
                    {subjects.map(subject =>
                        <Option key={subject} value={subject}>{subject}</Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item label="Image">
                <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl}/>
            </Form.Item>
            </Form>
            <AddField field={field} setField={setField}/>
        </Modal>
    );
};

export default CreateCollection;