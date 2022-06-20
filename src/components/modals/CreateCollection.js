import React, {useState} from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    Modal
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import UploadImage from "../UploadImage";

const CreateCollection = ({visible, setVisible}) => {
    const subjects = ["airplane", "car", "moto"];
    const types = ["Целочисленное", "Строковое", "Многострочный текст", "Чекбокс", "Дата"];
    const [field, setField] = useState([]);
    const [name, setName] = useState([]);

    const addField = () => {
        setField([...field, {id: Date.now(), title: ''}])
    }
    const removeField = (id) => {
        setField(field.filter(f => f.id !== id))
    }
    const hideModal = () => {
        setVisible(false);
    };
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return (
        <Modal
            title="Add New Collection"
            visible={visible}
            onOk={hideModal}
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
            <Input value={name}
                   onChange={(e) => setName(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Description">
            <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Subject">
            <Select>
            <Select.Option value="airplane">Airplane</Select.Option>
            <Select.Option value="car">Car</Select.Option>
            <Select.Option value="moto">Moto</Select.Option>
            </Select>
            </Form.Item>
            <Form.Item label="Image">
                <UploadImage/>
            </Form.Item>
            <Form.Item label="AdditionalItems">

            </Form.Item>
            </Form>

        </Modal>
    );
};

export default CreateCollection;