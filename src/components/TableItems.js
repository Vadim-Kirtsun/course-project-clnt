import {Table} from 'antd';

const TableItems = ({columns, data}) => <Table columns={columns} dataSource={data} />;

export default TableItems;