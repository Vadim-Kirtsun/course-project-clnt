import React, {useState} from 'react';
import {Form, Input, Modal, Select, Tag} from "antd";
import {createItem} from "../../http/itemApi";

const CreateItem = ({collectionId, visible, setVisible}) => {
    const { Option } = Select;
    const [componentSize, setComponentSize] = useState('default');
    const [form, setForm] = useState({});

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const submitItem = async (e) => {
        debugger;
        e.preventDefault()
        const newTags = form.tags.map(t =>({name: t}));
        const data = await createItem({name:form.name, tags:newTags, collectionId: collectionId});
        setVisible(false);
    };

    const options = [
        {
            value: 'gold',
        },
        {
            value: 'lime',
        },
        {
            value: 'green',
        },
        {
            value: 'cyan',
        },
    ];

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;

        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
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
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={tagRender}
                        defaultValue={form.tags}
                        value={form.tags}
                        onChange={value => setForm({...form, tags: value})}
                        style={{
                            width: '100%',
                        }}
                        options={options}
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