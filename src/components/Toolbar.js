import React from 'react';
import 'antd/dist/antd.css';
import {DeleteOutlined, LockOutlined, UnlockOutlined} from '@ant-design/icons';
import {blockUser, deleteUser, unblockUser} from "../http/userApi";


const Toolbar = ({selectedIds, setChangesCount, changesCount}) => {


    function logoutCurrentUserIfExistInSelectedIds() {
        let currentId = Number(localStorage.getItem('id'));
        if (selectedIds.filter(id => id === currentId).length === 1) {
            localStorage.removeItem('token')
        }
    }

    const block = () => {
        blockUser(selectedIds).then((response) => {
               if (response.err) {
                   console.log(response.err);
               }
               if (response.message) {
                   setChangesCount(++changesCount);
                   logoutCurrentUserIfExistInSelectedIds();
               }
           });
    };

    const unblock = () => {
        unblockUser(selectedIds).then((response) => {
            if (response.err) {
                console.log(response.err);
            }
            if (response.message) {
                setChangesCount(++changesCount);
                alert(response.message);
            }
        });
    };

    const deleteUsr = () => {
        deleteUser(selectedIds).then((response) => {
            if (response.err) {
                console.log(response.err);
            }
            if (response.message) {
                setChangesCount(++changesCount);
                alert(response.message);
                logoutCurrentUserIfExistInSelectedIds();
            }
        });
    };

    return (
        <div className='toolbar'>
            <span onClick={block} className='icon'>
                <LockOutlined />
            </span>
            <span onClick={unblock} className='icon'>
                <UnlockOutlined  />
            </span>
            <span onClick={deleteUsr} className='icon'>
                <DeleteOutlined />
            </span>
        </div>
    );
};

export default Toolbar;