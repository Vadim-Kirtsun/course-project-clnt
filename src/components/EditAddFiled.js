import React, {useState} from 'react';
import {DatePicker, Form, Input, Switch} from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const EditAddFiled = ({addFields}) => {
    const [addField, setAddField] = useState('');

    const updateField = (addField,value) =>{
        addField.value = value;
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

                {addFields.filter(af => af.type === "NUMBER").map(addField => (
                    <Form.Item key={addField.id} label={addField.name}>
                        <Input value={addField.value}
                               onChange={e => setAddField(addField.value = e.target.value)}/>
                    </Form.Item>
                    ))
                }

                {addFields.filter(af => af.type === "STRING").map(addField => (
                    <Form.Item key={addField.id} label={addField.name}>
                        <Input value={addField.value}
                               onChange={e => setAddField(addField.value = e.target.value)}/>
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type === "TEXT").map(addField => (
                    <Form.Item key={addField.id} label={addField.name}>
                        <TextArea value={addField.value}
                                  onChange={e => setAddField(addField.value = e.target.value)}/>
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type === "BOOLEAN").map(addField => (
                    <Form.Item key={addField.id} label={addField.name}>
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked={addField.value}
                             onChange={updateField(addField, !addField.value)}/>
                    </Form.Item>
                ))
                }

                {addFields.filter(af => af.type === "DATE").map(addField => (
                    <Form.Item key={addField.id} label={addField.name}>
                        <DatePicker defaultValue={moment(addField.value)}
                                    onChange={(date,dateString) => updateField(addField, dateString)}/>
                    </Form.Item>
                ))
                }
            </Form>
    )
};

export default EditAddFiled;