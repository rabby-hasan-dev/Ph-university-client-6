import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Courses from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import RegisteredSemesters from "../pages/admin/courseManagement/RegisteredSemesters";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import OfferedCourse from "../pages/faculty/OfferedCourse";


export const adminPaths = [

    {
        name: "Dashboard",
        path: 'dashboard',
        element: <AdminDashboard></AdminDashboard>,
    },
    {
        name: "Academic Management",
        children: [
            {
                name: "Create A. Semester",
                path: 'create-academic-semesters',
                element: <CreateAcademicSemester></CreateAcademicSemester>,
            },
            {
                name: "Academic Semester",
                path: 'academic-semesters',
                element: <AcademicSemester></AcademicSemester>,
            },
            {
                name: "Create A. Faculty",
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty></CreateAcademicFaculty>,
            },
            {
                name: "Academic Faculty",
                path: 'academic-faculty',
                element: <AcademicFaculty></AcademicFaculty>,
            },
            {
                name: "Create A. Department",
                path: 'create-academic-department',
                element: <CreateAcademicDepartment></CreateAcademicDepartment>,
            },
            {
                name: "Academic Department",
                path: 'academic-department',
                element: <AcademicDepartment></AcademicDepartment>,
            },


        ]

    },
    {
        name: "User Management",
        children: [
            {
                name: "Create Admin",
                path: 'create-admin',
                element: <CreateAdmin></CreateAdmin>,
            },
            {
                name: "Create Faculty",
                path: 'create-faculty',
                element: <CreateFaculty></CreateFaculty>,
            },
            {
                name: "create-student",
                path: 'create-student',
                element: <CreateStudent></CreateStudent>,
            },
            {
                name: "Students",
                path: 'student-data',
                element: <StudentData></StudentData>,
            },
            {
               
                path: 'student-data/:studentId',
                element: <StudentDetails></StudentDetails> ,
            },

        ]

    },
    {
        name: 'Course Management',
        children: [
          {
            name: 'Semester Registration',
            path: 'semester-registration',
            element: <SemesterRegistration />,
          },
          {
            name: 'Registered Semesters',
            path: 'registered-semesters',
            element: <RegisteredSemesters />,
          },
          {
            name: 'Create Course',
            path: 'create-course',
            element: <CreateCourse />,
          },
          {
            name: 'Courses',
            path: 'courses',
            element: <Courses />,
          },
          {
            name: 'Offer Course',
            path: 'offer-course',
            element: <OfferCourse />,
          },
          {
            name: 'Offered Courses',
            path: 'offered-courses',
            element: <OfferedCourse />,
          },
        ],
      },
    
]

