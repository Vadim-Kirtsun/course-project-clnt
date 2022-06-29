import React, {useEffect, useState} from 'react';
import {Form, Input, Select, Modal} from 'antd';
import TextArea from "antd/es/input/TextArea";
import UploadImage from "../UploadImage";
import {createCollection} from "../../http/collectionApi";
import CreateField from "./CreateField";


const CreateCollection = ({currentEditCollection, visible, setVisible}) => {
    const { Option } = Select;
    const subjects = ["Airplane", "Car", "Moto"];
    const [form, setForm] = useState({});
    const [componentSize, setComponentSize] = useState('default');

    const hideModal = (e) => {
        e.preventDefault()
        setVisible(false);
    };

    const submitCollection = async (e) => {
        e.preventDefault()
        const data = await createCollection(form);
        setVisible(false);
    };

    useEffect(() => {
        setForm(currentEditCollection)
    },[currentEditCollection]);


    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
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
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
            />
            </Form.Item>
            <Form.Item label="Description">
            <TextArea
                rows={4}
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
            />
            </Form.Item>
            <Form.Item label="Subject">
                <Select
                    value ={form.subject}
                    style={{
                        width: 120,
                    }}
                    onChange={(value) => setForm({...form, subject: value})}
                >
                    {subjects.map(subject =>
                        <Option key={subject} value={subject}>{subject}</Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item label="Image">
                <UploadImage imageUrl={form.image} setImageUrl={(value) => setForm({...form, image: value})}/>
            </Form.Item>
            </Form>
            <CreateField />
        </Modal>
    );
};

export default CreateCollection;