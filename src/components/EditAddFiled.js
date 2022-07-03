import React from 'react';
import {Form, Input, Switch} from "antd";

const EditAddFiled = ({addFields}) => {
    return (
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal">

                {addFields.filter(af => af.type ==="NUMBER").map(addField => (
                    <Form.Item label={addField.name}>
                        <Input />
                    </Form.Item>
                    ))
                }

                {addFields.filter(af => af.type ==="STRING").map(addField => (
                    <Form.Item label={addField.name}>
                        <Input />
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type ==="TEXT").map(addField => (
                    <Form.Item label={addField.name}>
                        <Input />
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type ==="BOOLEAN").map(addField => (
                    <Form.Item label={addField.name}>
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked/>
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type ==="DATE").map(addField => (
                    <Form.Item label={addField.name}>
                        <Input />
                    </Form.Item>
                ))
                }
            </Form>
    )
};

export default EditAddFiled;