import React, {useState} from 'react';
import {Form, Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {createCollection} from "../../http/collectionApi";
import {createItem} from "../../http/itemApi";

const CreateItem = ({collectionId, visible, setVisible}) => {
    const { Option } = Select;
    const [componentSize, setComponentSize] = useState('default');
    const [form, setForm] = useState({});

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const submitItem = async (e) => {
        e.preventDefault()
        const data = await createItem({...form, collectionId: collectionId});
        setVisible(false);
    };
    return (
        <Modal
            title="Add New Item"
            visible={visible}
            onOk={submitItem}
            onCancel={() => setVisible(false)}
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
                <Form.Item label="Tags">
                    <TextArea
                        rows={4}
                        value={form.tags}
                        onChange={e => setForm({...form, tags: e.target.value})}
                    />
                </Form.Item>
                {/*<Form.Item label="Subject">
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
                </Form.Item>*/}
            </Form>
        </Modal>
    );
};

export default CreateItem;