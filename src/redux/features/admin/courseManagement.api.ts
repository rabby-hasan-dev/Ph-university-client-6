import { TQueryParams, TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";



const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRegisteredSemester: builder.query({
            query: (args) => {

                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    }
                    )
                }



                return {
                    url: '/semester-registrations',
                    method: "GET",
                    params: params
                }

            },
            providesTags:['semester'],
            transformResponse: (response: TResponseRedux<TSemester[]>) => {

                return {
                    data: response.data,
                    meta: response.meta
                };
            }
        }),


        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: "POST",
                body: data
            }),
            invalidatesTags:['semester']
        }),
        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: "PATCH",
                body: args.data
            }),
            invalidatesTags:['semester']

        }),

        getAllCourses: builder.query({
            query: (args) => {

                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(item.name, item.value as string)
                    }
                    )
                }



                return {
                    url: '/courses',
                    method: "GET",
                    params: params
                }

            },
            providesTags:['courses'],
            transformResponse: (response: TResponseRedux<any>) => {

                return {
                    data: response.data,
                    meta: response.meta
                };
            }
        }),


        addCourses: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: "POST",
                body: data
            }),
            invalidatesTags:['courses']
        }),
        
        addFaculties: builder.mutation({
            query: (args) => ({
                url: `/courses/${args.courseId}/assign-faculties`,
                method: "PUT",
                body: args.data
            }),
            invalidatesTags:['courses']
        }),



    }),
})


export const {
    useAddRegisteredSemesterMutation,
    useGetAllRegisteredSemesterQuery,
    useUpdateRegisteredSemesterMutation,
    useAddCoursesMutation,
    useGetAllCoursesQuery,
    useAddFacultiesMutation
} = courseManagementApi;