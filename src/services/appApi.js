import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


// define a servic using a base URL

const appApi = createApi({
    reducerPath : 'appApi',
    baseQuery : fetchBaseQuery({
        baseUrl : "https://chatapp-narenthar.herokuapp.com/"
    }),
    endpoints : (builder) => ({
        // to create a user
        signupUser : builder.mutation({
            query : (user) => ({
                url : '/users',
                method : 'POST',
                body : user,
            })
        }),

        // to login
        loginUser : builder.mutation({
            query : (user) => ({
                url : '/users/login',
                method : 'POST',
                body : user,
            })
        }),

        // to logout
        logoutUser : builder.mutation({
            query : (payload) => ({
                url : '/logout',
                method : 'DELETE',
                body : payload,
            })
        })
    })
})


export const {useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation} = appApi;
export default appApi;