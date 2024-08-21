

import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";

import { useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";



const SemesterRegistration = () => {

    const {data:academicSemester}=useGetAllAcademicSemesterQuery([
        {
            name:"sort",
            value:"year"
        }
    ]);
   
    const [addRegisterdSemester]=useAddRegisteredSemesterMutation();

    const academicSemesterOptions=academicSemester?.data?.map(item=>(
        {
            value:item._id,
            label:`${item.name} ${item.year} `
        }
    ))

    const onSubmit: SubmitHandler<FieldValues> =async (data) => {
        const toastId=toast.loading('creating ....')
  

        const semesterData = {
           ...data,
           minCredit:Number(data.minCredit),
          maxCredit:Number(data.maxCredit),
        }

      

        try{

         const res=await  addRegisterdSemester(semesterData) as TResponse<any>;
         console.log(res);
            if(res.error){
                toast.error(res.error.data.message , {id:toastId});
            }else{
                toast.success('semester created');
            }
        
        }catch(error){
            toast.error('something went wrong',{id:toastId})
        }


    }





    return (
        <Flex justify="center" align="center" >
            <Col span={6} >

                <PHForm onSubmit={onSubmit}  >
                    <PHSelect label="Academic Semester" name="academicSemester" options={academicSemesterOptions} ></PHSelect>
                    <PHSelect label="Status" name="status" options={semesterStatusOptions} ></PHSelect>
                    <PHDatePicker label="Start Date" name="startDate"  ></PHDatePicker>
                    <PHDatePicker label="End Date" name="endDate"  ></PHDatePicker>
                    <PHInput name="minCredit" type="text" label="Min Credit" ></PHInput>
                    <PHInput name="maxCredit" type="text" label="Max Credit" ></PHInput>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>

            </Col>
        </Flex>
    );
};

export default SemesterRegistration;