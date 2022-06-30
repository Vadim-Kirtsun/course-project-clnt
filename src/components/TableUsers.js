import React, {useContext, useEffect, useState} from 'react';
import "antd/dist/antd.css";
import {Button, Table} from 'antd';
import {blockUser, changeRoleUser, getUsers} from "../http/userApi";
import {UserContext} from "../App";

const columns = [
    {
        title: 'Id',
        dataIndex: 'id'
    },
    {
        title: 'Username',
        dataIndex: 'username'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Status',
        dataIndex: 'status'
    },
    {
        title: 'Role',
        dataIndex: 'role'
    },
    {
        title: 'Action',
        dataIndex: 'action'
    }
];

const TableUsers = ({setSelectedIds, setChangesCount, changesCount}) => {
    const [users, setUsers] = useState([]);
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedIds(selectedRowKeys);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name
        }),
    };

    function changeRole(id, role) {
        changeRoleUser(id, role).then((response) => {
            if (response.err) {
                console.log(response.err);
            }
            if (response.message) {
                if(currentUser.id === id){setCurrentUser({...currentUser, role:role})};
                setChangesCount(++changesCount);
            }
        });
    }

    const actionButton = (id, role) => {
        const isUser = role.toUpperCase() == "USER";
        const param = (isUser) ? "ADMIN" : "USER";
        return  <Button onClick={() => changeRole(id, param)}>Make {param}</Button>;
    }

   useEffect(() => {
        getUsers().then(data => {
            if (data.length > 0){
                const results= data.map(row => ({
                    key: row.id,
                    id: row.id,
                    username: row.name,
                    email: row.email,
                    status: row.blocked ? 'blocked' : 'active',
                    role: row.role,
                    action: actionButton(row.id, row.role)
                }));
                setUsers(results);
            } else {
                alert(data.message);
            }}
        );
    }, [changesCount]);


    const selectionType = 'checkbox';

    return (
        <div>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={users}
            />
        </div>
    );
};

export default TableUsers;