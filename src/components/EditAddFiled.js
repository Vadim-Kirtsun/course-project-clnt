import React from 'react';
import {DatePicker, Form, Input, Switch} from "antd";
import TextArea from "antd/es/input/TextArea";

const EditAddFiled = ({addFields}) => {

    const updateField = (addField,value) =>{
        addField.value = value;
        console.log(addFields)
    }

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
                        <Input value={addField.value}
                               onChange={e => updateField(addField, e.target.value)}/>
                    </Form.Item>
                    ))
                }

                {addFields.filter(af => af.type ==="STRING").map(addField => (
                    <Form.Item label={addField.name}>
                        <Input value={addField.value}
                               onChange={e => updateField(addField, e.target.value)}/>
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type ==="TEXT").map(addField => (
                    <Form.Item label={addField.name}>
                        <TextArea value={addField.value}
                                  onChange={e => updateField(addField, e.target.value)}/>
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type ==="BOOLEAN").map(addField => (
                    <Form.Item label={addField.name}>
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked={addField.value}
                             onChange={updateField(addField, !addField.value)}/>
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type ==="DATE").map(addField => (
                    <Form.Item label={addField.name}>
                        <DatePicker value={addField.value}
                                    onChange={(date,dateString) => updateField(addField, dateString)}/>
                    </Form.Item>
                ))
                }
            </Form>
    )
};

export default EditAddFiled;