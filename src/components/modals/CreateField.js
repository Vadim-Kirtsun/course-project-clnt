import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {deleteAdditionalFields, saveAdditionalFields} from "../../http/additionaFieldsApi";

const CreateField = ({collectionId, currentAddFields, visible, setVisible}) => {
    const { Option } = Select;
    const initialTypes = ["NUMBER", "STRING", "TEXT", "BOOLEAN", "DATE"];
    const [types, setTypes] = useState(initialTypes);
    const [form] = Form.useForm();

    const onFinish = async (additionalFields) => {
        const prevIds = currentAddFields.map(elem => elem.id);
        const currentIds = additionalFields.additionalFields.map(elem => elem.id);
        let difference = prevIds.filter(x => !currentIds.includes(x));
        if (difference.length > 0) {
            await deleteAdditionalFields(difference);
        }
        await saveAdditionalFields(collectionId, additionalFields.additionalFields);
        setVisible(false);
    };
    const onChange = async (changedFields, allFields) => {
        const groupByType = allFields[0].value.filter(v=>(v)).reduce((group, addField) => {
            const { type } = addField;
            group[type] = group[type] ?? [];
            group[type].push(addField);
            return group;
        }, {});
        const newTypes = initialTypes.filter(t => ((!groupByType[t]) || groupByType[t].length < 3));
        setTypes(newTypes);
    };
    const addField = (add) => {
        add();
    }
    useEffect(() => form.resetFields(), [currentAddFields]);

    return (
        <Modal
            forceRender
            title="Manage Additional Fields"
            visible={visible}
            onOk={form.submit}
            onCancel={() => setVisible(false)}
        >
            <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} onFieldsChange={onChange} autoComplete="off" initialValues={currentAddFields}>
                <Form.List name="additionalFields" initialValue={currentAddFields} >
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
                                            placeholder="Type">
                                            {types.map(type =>
                                                <Option key={type} value={type}>{type}</Option>
                                            )}
                                        </Select>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => addField(add)} block icon={<PlusOutlined />}>
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