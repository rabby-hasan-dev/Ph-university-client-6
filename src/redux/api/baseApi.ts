import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";
import { toast } from "sonner";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("Authorization", `${token}`)

        }

        return headers;
    }
})


const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (arg, api, extraOptions): Promise<any> => {

    let result = await baseQuery(arg, api, extraOptions);

    if(result.error?.status ===404){
        toast.error(result.error.data.message);
    }
    if (result.error?.status === 401) {
        // send Refresh Token
        const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
            credentials: "include",
            method: "POST",
        });
        const data = await res.json();

        if (data?.data?.accessToken) {

            const user = (api.getState() as RootState).auth.user;

            api.dispatch(setUser({
                user,
                token: data.data.accessToken
            }))

            result = await baseQuery(arg, api, extraOptions);
        } else {
            api.dispatch(logOut())
        }

    }
    return result;
}


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes:['semester','courses'],
    endpoints: () => ({}),

})

