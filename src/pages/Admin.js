import React, {useState} from 'react';
import TableUsers from "../components/TableUsers";
import Toolbar from "../components/Toolbar";

const Admin = () => {
    const [selectedIds, setSelectedIds] = useState([]);
    const [changesCount, setChangesCount] = useState(0);

    return (
        <div className="App">
            <h1>Users:</h1>
            <Toolbar selectedIds={selectedIds} setChangesCount={setChangesCount} changesCount={changesCount}/>
            <TableUsers setSelectedIds={setSelectedIds} setChangesCount={setChangesCount} changesCount={changesCount}/>
        </div>
    );
}
export default Admin;