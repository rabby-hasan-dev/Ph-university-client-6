import { Button, Col, Flex } from 'antd';
import PHForm from '../../../components/form/PHForm';

import PHInput from '../../../components/form/PHInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useGetAcademicDepartmentQuery, useGetAcademicFacultiesQuery, useGetAllAcademicSemesterQuery } from '../../../redux/features/admin/academicManagement.api';
import { useGetAllCoursesQuery, useGetAllRegisteredSemesterQuery } from '../../../redux/features/admin/courseManagement.api';
import { useGetAllFacultiesQuery } from '../../../redux/features/admin/userManagement.api';
import PHSelectWithWatch from '../../../components/form/PHSelectWithWatch';
import { useState } from 'react';


const dummydata={
    "semesterRegistration":"657f07f25f71bfe7a0eb4301",
    "academicFaculty":"656701a9adaebc55db21bde8",
    "academicDepartment": "65797f29ab434256ca6e648c",
    "course": "657707078cf5db4b6e5e6450",
    "faculty": "656dce37133c4a8a53eb5f09",
    "section": 1,
    "maxCapacity": 50,
    "days": ["Sun","Mon"],
    "startTime": "10:30",
    "endTime": "12:30"
  }

const OfferCourse = () => {

    const [id,setId]=useState('');

    const {data:academicFaculty}=useGetAcademicFacultiesQuery(undefined);
   const {data:semesterRegistration}=useGetAllRegisteredSemesterQuery(undefined);
    const {data:academicDepartment}=useGetAcademicDepartmentQuery(undefined);
    const {data:course}=useGetAllCoursesQuery(undefined);
    const {data:faculty}=useGetAllFacultiesQuery(undefined);

    const academicSemesterOptions=academicFaculty?.data?.map(item=>(
        {
            value:item._id,
            label: item.name
        }
    ))


    const onSubmit: SubmitHandler<FieldValues> =async (data) => {
        const toastId=toast.loading('creating ....')
  

        const semesterData = {
          
        }

      

        // try{

        //  const res=await  addRegisterdSemester(semesterData) as TResponse<any>;
        //  console.log(res);
        //     if(res.error){
        //         toast.error(res.error.data.message , {id:toastId});
        //     }else{
        //         toast.success('semester created');
        //     }
        
        // }catch(error){
        //     toast.error('something went wrong',{id:toastId})
        // }


    }



    return (
        <Flex justify="center" align="center" >
        <Col span={6} >

            <PHForm onSubmit={onSubmit}  >
                 <PHSelectWithWatch onValueChange={setId} label="Academic faculty" name="academicFaculty" options={academicSemesterOptions} ></PHSelectWithWatch>
                {/* <PHSelect label="Status" name="status" options={semesterStatusOptions} ></PHSelect>  */}
                
                <PHInput disabled={!id} name="minCredit" type="text" label="Min Credit" ></PHInput>
                <PHInput name="maxCredit" type="text" label="Max Credit" ></PHInput>
                <Button htmlType="submit">Submit</Button>
            </PHForm>

        </Col>
    </Flex>
    );
};

export default OfferCourse;