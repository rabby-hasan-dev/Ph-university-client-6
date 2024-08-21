import OfferedCourse from "../pages/student/OfferedCourse";
import StuddentDashboard from "../pages/student/StuddentDashboard";



export const studentPaths = [

    {
        name: "Dashboard",
        path: 'dashboard',
        element: <StuddentDashboard></StuddentDashboard>,
    },
    {
        name: "Offered Course",
        path: 'offered-course',
        element: <OfferedCourse></OfferedCourse>,
    }


]