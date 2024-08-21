import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAcademicDepartmentQuery, useGetAllAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";


const studentDummyData = {
    "password": "student123",
    "student": {

        "name": {
            "firstName": "Mr. Student2",
            "middleName": "",
            "lastName": "Good"
        },
        "gender": "male",
        "dateOfBirth": "1990-01-01",
        "email": "abcd@gmail.com",
        "contactNo": "123567",
        "emergencyContactNo": "987-654-3210",
        "bloogGroup": "A+",
        "presentAddress": "123 Main St, Cityville",
        "permanentAddress": "456 Oak St, Townsville",

        "guardian": {
            "fatherName": "James Doe",
            "fatherOccupation": "Engineer",
            "fatherContactNo": "111-222-3333",
            "motherName": "Mary Doe",
            "motherOccupation": "Teacher",
            "motherContactNo": "444-555-6666"
        },

        "localGuardian": {
            "name": "Alice Johnson",
            "occupation": "Doctor",
            "contactNo": "777-888-9999",
            "address": "789 Pine St, Villageton"
        },

        "admissionSemester": "65663d516435f247a24e9169",
        "academicDepartment": "656701b4adaebc55db21bdea",
        // "profileImg": "path/to/profile/image.jpg"
    }

}

// for development . should't for production
const studentDefaultValues = {
    "name": {
        "firstName": "Mr. Student2",
        "middleName": "twist",
        "lastName": "Good"
    },
    "gender": "male",
    "email": "abcd12@gmail.com",
    "contactNo": "123567",
    "emergencyContactNo": "987-654-3210",
    "bloogGroup": "A+",
    "presentAddress": "123 Main St, Cityville",
    "permanentAddress": "456 Oak St, Townsville",

    "guardian": {
        "fatherName": "James Doe",
        "fatherOccupation": "Engineer",
        "fatherContactNo": "111-222-3333",
        "motherName": "Mary Doe",
        "motherOccupation": "Teacher",
        "motherContactNo": "444-555-6666"
    },

    "localGuardian": {
        "name": "Alice Johnson",
        "occupation": "Doctor",
        "contactNo": "777-888-9999",
        "address": "789 Pine St, Villageton"
    },

    // "admissionSemester": "65663d516435f247a24e9169",
    // "academicDepartment": "656701b4adaebc55db21bdea",
}


const CreateStudent = () => {

    const { data: sData, isLoading: sIsLoading } = useGetAllAcademicSemesterQuery(undefined);
    const { data: dData, isLoading: dIsloading } = useGetAcademicDepartmentQuery(undefined, { skip: sIsLoading });
    const [addStudent, { data, error }] = useAddStudentMutation();


       console.log({data,error});

    const semesterOptions = sData?.data?.map(item => (
        {
            label: `${item.name} ${item.year}`,
            value: item._id
        }
    ))

    const departmentOptions = dData?.data?.map(item => (
        {
            label: item.name,
            value: item._id
        }
    ))
    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        const studentData = {
            password: "student123",
            student: data
        }

        console.log(data);

        const formData = new FormData();
        formData.append('data', JSON.stringify(studentData));
        formData.append('file', data?.image);

        addStudent(formData);
        // console.log(Object.fromEntries(formData));
    }

    return (
        <Row>
            <Col span={24} >
                <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues} >
                    <Divider>Personal Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="name.firstName" type="text" label="First Name" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8}  >
                            <PHInput name="name.middleName" type="text" label="Middle Name" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8}  >
                            <PHInput name="name.lastName" type="text" label="Last Name" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHSelect name="gender" options={genderOptions} label="Gender" ></PHSelect>
                        </Col>
                        <Col span={24} md={12} lg={8}  >
                            <PHDatePicker name="dateOfBirth" label="Date Of Birth" ></PHDatePicker>
                        </Col>
                        <Col span={24} md={12} lg={8}  >
                            <PHSelect name="bloogGroup" options={bloodGroupOptions} label="Blood Group" ></PHSelect>
                        </Col>
                        <Col span={24} md={12} lg={8}  >
                            <Controller
                                name="image"
                                render={({ field: { onChange,value, ...field  } }) =>
                                    
                                (
                                    <Form.Item label="Picture" >
                                        <Input 
                                        type="file" {...field} 
                                        onChange={(e)=>onChange(e.target.files?.[0])} 
                                        value={value?.fileName}
                                        ></Input>
                                    </Form.Item>
                                )
                                }

                            />
                        </Col>

                    </Row>
                    <Divider>Conatac Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={12} lg={8}  >
                            <PHInput name="email" type="text" label="email" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="contactNo" type="text" label="Contact No" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8}  >
                            <PHInput name="emergencyContactNo" type="text" label="Emergency Contact No" ></PHInput>
                        </Col>

                        <Col span={24} md={12} lg={8}  >
                            <PHInput name="presentAddress" type="text" label="Present Address" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8}  >
                            <PHInput name="permanentAddress" type="text" label="Permanent Address" ></PHInput>
                        </Col>
                    </Row>

                    <Divider>Guardian Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="guardian.fatherName" type="text" label="Father Name" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="guardian.fatherOccupation" type="text" label="Father Occupation" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="guardian.fatherContactNo" type="text" label="Father ContactNo" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="guardian.motherName" type="text" label="Mother Name" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="guardian.motherOccupation" type="text" label="Mother Occupation" ></PHInput>
                        </Col>

                        <Col span={24} md={12} lg={8} >
                            <PHInput name="guardian.motherContactNo" type="text" label="Mother ContactNo" ></PHInput>
                        </Col>


                    </Row>
                    <Divider>Local Guardian Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="localGuardian.name" type="text" label=" Name" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="localGuardian.occupation" type="text" label="Occupation" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="localGuardian.contactNo" type="text" label="ContactNo" ></PHInput>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHInput name="localGuardian.address" type="text" label="Address" ></PHInput>
                        </Col>

                    </Row>
                    <Divider> Academic Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={12} lg={8} >
                            <PHSelect name="admissionSemester" disabled={sIsLoading} options={semesterOptions} label="AdmissionSemester" ></PHSelect>
                        </Col>
                        <Col span={24} md={12} lg={8} >
                            <PHSelect name="academicDepartment" disabled={dIsloading} options={departmentOptions} label="AcademicDepartment" ></PHSelect>
                        </Col>


                    </Row>

                    <Button htmlType="submit" >Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateStudent;