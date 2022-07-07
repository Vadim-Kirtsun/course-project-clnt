import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Select, Switch, Tag} from "antd";
import {createItem, fetchTags} from "../../http/itemApi";
import EditAddFiled from "../EditAddFiled";


const CreateItem = ({collectionId, addFields = [], currentItem, visible, setVisible}) => {
    const [componentSize, setComponentSize] = useState('default');
    const [form, setForm] = useState({});
    const [options, setOptions] = useState([]);

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const submitItem = async (e) => {
        e.preventDefault()
        const newTags = form.tags.map(t => ({name: t}));
        await createItem({
            id: form.id,
            name: form.name,
            tags: newTags,
            addFields: form.addFields,
            collectionId: collectionId
        });
        setVisible(false);
    };

    const fillAddFieldsArray = (addFields) => {
        const result = addFields.map(addField => ({
            addField_id: addField.id,
            name: addField.name,
            type: addField.type,
            value: getValue(addField.id),
        }))
        return result;
    }

    const getValue = (id) => {
        if (currentItem.add_field_values) {
            return currentItem.add_field_values.filter(fv => fv.addFieldId === id).map(v => v.value)[0];
        }

        return '';
    }
    useEffect(() => {
        setForm({
            id: currentItem.id,
            name: currentItem.name,
            tags: (currentItem.tags !== undefined)
                ? currentItem.tags.map(t => t.name)
                : [],
            addFields: (addFields) ? fillAddFieldsArray(addFields) : []
        });
        fetchTags().then(data => {
            const tagOptions = data.map(t => ({value: t.name}));
            setOptions(tagOptions);
        })
    }, [visible])

    const tagRender = (props) => {
        const {label, value, closable, onClose} = props;

        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
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
                <Form.Item label="Id" hidden>
                    <Input
                        value={form.id}
                        hidden
                    />
                </Form.Item>
                <Form.Item label="Name">
                    <Input
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                    />
                </Form.Item>
                <Form.Item label="Tags">
                    <Select
                        mode="tags"
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
            </Form>
            {(addFields !== undefined)
                ? <EditAddFiled addFields={form.addFields}/>
                : <div></div>}
        </Modal>
    );
};

export default CreateItem;