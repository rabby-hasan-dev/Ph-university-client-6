

import { Button, Dropdown, Space, Table, TableColumnsType, Tag, } from "antd";
import { useGetAllRegisteredSemesterQuery, useUpdateRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types";
import moment from "moment";
import { useState } from "react";




export type TTableData = Pick<TSemester, 'status' | 'startDate' | 'endDate'>


const items = [

    {
        label: 'UPCOMING',
        key: 'UPCOMING',

    },
    {
        label: 'ONGOING',
        key: 'ONGOING',

    },
    {
        label: 'ENDED',
        key: 'ENDED',

    },
]




const RegisteredSemesters = () => {
    // const [params, setParams] = useState<TQueryParams[]|undefined> (undefined);
    const [semesterId, setSemesterId] = useState('')

    const { data: semesterData, isFetching } = useGetAllRegisteredSemesterQuery(undefined)
    const [updateSemesterStatus]=useUpdateRegisteredSemesterMutation();
    const tableData = semesterData?.data?.map(({ _id, academicSemester, status, startDate, endDate }) => ({
        key: _id,
        name: `${academicSemester?.name} ${academicSemester?.year}`,
        status,
        startDate: moment(new Date(startDate)).format("MMMM YYYY"),
        endDate: moment(new Date(endDate)).format("MMMM YYYY"),
    }))

    const handleStatusUpdate =async (data) => {
        const updatedData = {
            id: semesterId,
            data: {
                status: data?.key,
            }
        }
       
        try{
            const res= await  updateSemesterStatus(updatedData);
            console.log(res);
        }catch(error){
            console.log(error);
        }
      
    }

    const menuProps = {
        items,
        onClick: handleStatusUpdate,
    };


    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },

        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (item) => {

                let color;
                if (item === "UPCOMING") {
                    color = "blue"
                }

                if (item === "ONGOING") {
                    color = "green"
                }

                if (item === "ENDED") {
                    color = "red"
                }


                return <Tag color={color} >{item} </Tag>
            }
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
        },
        {
            title: 'Action',
            key: "x",
            render: (item) => {

                return (
                    <Dropdown menu={menuProps} trigger={['click']} >
                        <Button onClick={() => setSemesterId(item.key)} > update</Button>
                    </Dropdown>
                )


            }
        },
    ];

    // const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {

    //     console.log({filters, extra})

    //     if (extra.action === 'filter') {
    //         const queryParams:TQueryParams[] = [];

    //         filters?.name?.forEach((item) =>
    //             queryParams.push({ name: "name", value: item })
    //         );
    //         filters?.year?.forEach((item) =>
    //             queryParams.push({ name: "year", value: item })
    //         );

    //         setParams(queryParams);

    //     }



    // };



    return (
        <div>
            <Table
                columns={columns}
                loading={isFetching}
                dataSource={tableData}
                // onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
        </div>
    );
};

export default RegisteredSemesters;