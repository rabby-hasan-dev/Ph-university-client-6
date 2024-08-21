
import { Button, Modal, Table } from 'antd';


import { useAddFacultiesMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagement.api';
import { useState } from 'react';
import PHForm from '../../../components/form/PHForm';
import PHInput from '../../../components/form/PHInput';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';
import PHSelect from '../../../components/form/PHSelect';

const Courses = () => {
    // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

    const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

    const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
        key: _id,
        title,
        code: `${prefix}${code}`,
    }));

    const columns = [
        {
            title: 'Title',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                return <AddFacultyModal facultyInfo={item}></AddFacultyModal>;
            },
        },
    ];

    // const onChange: TableProps<TTableData>['onChange'] = (
    //   _pagination,
    //   filters,
    //   _sorter,
    //   extra
    // ) => {
    //   if (extra.action === 'filter') {
    //     const queryParams: TQueryParam[] = [];
    //     setParams(queryParams);
    //   }
    // };

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
        // onChange={onChange}
        />
    );
};




const AddFacultyModal = ({ facultyInfo }) => {
    const { data: faculties } = useGetAllFacultiesQuery(undefined);
    const [addFaculty]=useAddFacultiesMutation();

    const facultiesOptions = faculties?.data?.map((item) => ({
        value: item._id,
        label: item.fullName,
    }));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async(data) => {
       const facultyData={
        courseId:facultyInfo.key,
        data,
       }
     

       const res= await addFaculty(facultyData);
       console.log(res);

    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
      };


    return (
        <>
            <Button onClick={showModal}>
                Add Faculty
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}  >
                <PHForm onSubmit={handleSubmit}>
                    <PHSelect mode='multiple' name='faculties' label='Faculty' options={facultiesOptions} ></PHSelect>
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Modal>
        </>
    )
}

export default Courses

