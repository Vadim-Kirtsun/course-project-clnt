import React, {useState} from 'react';
import {Button, Form, Input, Modal, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {saveAdditionalFields} from "../../http/additionaFieldsApi";

const CreateField = ({collectionId, visible, setVisible}) => {
    const { Option } = Select;
    const [fields, setFields] = useState([]);
    const types = ["NUMBER", "STRING", "TEXT", "BOOLEAN", "DATE"];
    const [form] = Form.useForm();

    const onFinish = async (additionalFields) => {
        console.log('Received values of form:', additionalFields);
         const data = await saveAdditionalFields(collectionId, additionalFields);
    };

    const hideModal = (e) => {
        e.preventDefault()
        setVisible(false);
    };

    return (
        <Modal
            title="Manage Additional Fields"
            visible={visible}
            onOk={form.submit}
            onCancel={hideModal}
        >
            <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.List name="additionalFields">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'id']}
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Missing id',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="id" hidden/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'type']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing type',
                                            },
                                        ]}
                                    >
                                        <Select
                                            style={{
                                                width: 120,
                                            }}
                                        >
                                            {types.map(type =>
                                                <Option key={type} value={type}>{type}</Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default CreateField;