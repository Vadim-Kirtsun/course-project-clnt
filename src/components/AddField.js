import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Form, Input, Select, Space} from 'antd';

const AddField = ({field, setField}) => {
    const { Option } = Select;
    const types = ["Целочисленное", "Строковое", "Многострочный текст", "Чекбокс", "Дата"];

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    const handleChange = (value) => {
        setField({...field, type: value});
    };

    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="users">
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
                                    name={[name, 'first']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing first name',
                                        },
                                    ]}
                                >
                                    <Input
                                        value={name}
                                        onChange={e => setField({...field, name: e.target.value})}
                                        placeholder="First Name"
                                    />
                                </Form.Item>
                                <Form.Item label="Type">
                                    <Select
                                        defaultValue="Целочисленное"
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={handleChange}
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
    );
};

export default AddField;