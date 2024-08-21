import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicSemester.types";
import { useState } from "react";
import { TQueryParams } from "../../../types";


export type TTableData = Pick<TAcademicSemester,  'name' | 'year' | 'startMonth' | 'endMonth'>



const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParams[]|undefined> (undefined);
    const { data: semesterData , isFetching } = useGetAllAcademicSemesterQuery(params);


    const tableData = semesterData?.data?.map(({ _id, name, year, startMonth, endMonth }) => ({
        key: _id,
        name,
        year,
        startMonth,
        endMonth
    }))



    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Summer',
                    value: 'Summer',
                },
                {
                    text: 'Fall',
                    value: 'Fall',
                },

            ],

        },
        {
            title: 'Year',
            dataIndex: 'year',
            filters: [
                {
                    text: '2024',
                    value: '2024',
                },
                {
                    text: '2025',
                    value: '2025',
                },
                {
                    text: '2026',
                    value: '2026',
                },

            ],
        },
        {
            title: 'Start Month',
            dataIndex: 'startMonth',
        },
        {
            title: 'End Month',
            dataIndex: 'endMonth',
        },
        {
            title: 'Action',
            key:"x",
            render:()=>{

                return <div> <Button>Update</Button> </div>
            }
        },
    ];

    const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {

        console.log({filters, extra})

        if (extra.action === 'filter') {
            const queryParams:TQueryParams[] = [];

            filters?.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            );
            filters?.year?.forEach((item) =>
                queryParams.push({ name: "year", value: item })
            );

            setParams(queryParams);

        }

        

    };



    return (
        <div>
            <Table
                columns={columns}
                loading={isFetching}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
        </div>
    );
};

export default AcademicSemester;