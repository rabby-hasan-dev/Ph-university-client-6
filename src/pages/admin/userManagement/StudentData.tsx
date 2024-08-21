import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParams, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";


export type TTableData = Pick<TStudent, 'name' | 'id' | 'email' | 'contactNo'>



const StudentData = () => {
    const [params, setParams] = useState<TQueryParams[]>([]);
    const [page, setPage] = useState(0);
    const { data: studentData, isFetching } = useGetAllStudentsQuery([

        { name: 'limit', value: 4, },
        { name: 'page', value: 'page', },
        { name: 'sort', value: 'id', },
        ...params
    ]);


    const tableData = studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
        key: _id,
        fullName,
        id,
        email,
        contactNo
    }))

    const metaData = studentData?.meta;


    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'fullName',
            showSorterTooltip: { target: 'full-header' },


        },
        {
            title: 'Roll No',
            dataIndex: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Contact No',
            dataIndex: 'contactNo',
        },

        {
            title: 'Action',
            key: "x",
            render: (item) => {
                
                return <Space>
                   <Link to={item.key} > <Button>Details</Button></Link>
                    <Button>Update</Button>
                    <Button>Block</Button>
                </Space>
            },
            width: "1%"
        },
    ];

    const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {

        console.log({ filters, extra })

        if (extra.action === 'filter') {
            const queryParams: TQueryParams[] = [];

            filters?.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            );

            setParams(queryParams);

        }



    };



    return (
        <>
            <Table
                columns={columns}
                loading={isFetching}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
                pagination={false}
            />
            <Pagination
                current={page}
                pageSize={metaData?.limit}
                total={metaData?.total}
                onChange={(value) => setPage(value)}
            ></Pagination>
        </>
    );
};

export default StudentData;