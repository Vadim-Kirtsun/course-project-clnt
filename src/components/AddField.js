import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Form, Input, Select, Space} from 'antd';

const AddField = ({fields, setFields}) => {
    const { Option } = Select;
    const types = ["NUMBER", "STRING", "TEXT", "CHECKBOX", "DATE"];

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        debugger
        setFields(values);
    };

    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
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
                                    name={[name, 'name']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing first name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="First Name" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'type']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing last name',
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
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddField;