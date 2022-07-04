import {Descriptions} from "antd";
import React from "react";

const AddFieldValues = ({fields, values, currentItemName}) => {
    const data = (!fields)
        ? []
        : fields.map(f => ({
            id: f.id,
            title: f.name,
            value: values.filter(v => v.addFieldId === f.id).map(v => v.value)
        }))

    return (<Descriptions
            title={currentItemName}
            bordered
            column={{
                xxl: 4,
                xl: 3,
                lg: 3,
                md: 3,
                sm: 2,
                xs: 1,
            }}>
            {data.map((dataItem) => (
                <Descriptions.Item key={dataItem.id} label={dataItem.title}>{dataItem.value}</Descriptions.Item>
            ))}
        </Descriptions>
    );
};

export default AddFieldValues;