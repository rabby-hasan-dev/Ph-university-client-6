import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const {studentId}=useParams();
    return (
        <div>
            <h2>Student Detils of   {studentId} </h2>
        </div>
    );
};

export default StudentDetails;