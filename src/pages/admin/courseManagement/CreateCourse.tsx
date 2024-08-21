

import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { useAddCoursesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";



const CreateCourse = () => {

    const { data: courses } = useGetAllCoursesQuery(undefined);
    const [createCourse] = useAddCoursesMutation();


    const preRequisiteCoursesOptions = courses?.data?.map(item => (
        {
            value: item._id,
            label: item.title
        }
    ))

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('creating ....', {duration:3000})

        const coursesData = {
            ...data,
            isDeleted: false,
            preRequisiteCourses:data?.preRequisiteCourses?data?.preRequisiteCourses?.map(item => ({
                course: item,
                isDeleted: false,


            })):[],
            credits: Number(data?.credits),
            code: Number(data?.code),


        }




        try {

            const res = await createCourse(coursesData) as TResponse<any>;
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success('semester created');
            }

        } catch (error) {
            toast.error('something went wrong', { id: toastId })
        }


    }





    return (
        <Flex justify="center" align="center" >
            <Col span={6} >

                <PHForm onSubmit={onSubmit}  >


                    <PHInput name="title" type="text" label="Title" ></PHInput>
                    <PHInput name="code" type="text" label="Code" ></PHInput>
                    <PHInput name="prefix" type="text" label="Prefix" ></PHInput>
                    <PHInput name="credits" type="text" label=" Credits" ></PHInput>
                    <PHSelect mode="multiple" label="Prerequisites Courses" name="preRequisiteCourses" options={preRequisiteCoursesOptions} ></PHSelect>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>

            </Col>
        </Flex>
    );
};

export default CreateCourse;