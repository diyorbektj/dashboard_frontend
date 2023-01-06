// @ts-check
import { defineStore } from 'pinia'
import {BASE_URL} from "~/constants";
import axios from "axios";

/**
 * Simulate a login
 */
function apiLogin(a: string, p: string) {
    if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true })
    if (p === 'ed') return Promise.resolve({ isAdmin: false })
    return Promise.reject(new Error('invalid credentials'))
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {},
        isAuthorized: false,
        isAdmin: false,
    }),

    actions: {
        logout() {
            this.$patch({
                user: {},
                isAuthorized: false,
                isAdmin: false,
            })

            // we could do other stuff like redirecting the user
        },

        /**
         * Attempt to login a user
         */
        Login(email: string, password: string) {
           axios.post(BASE_URL+`/api/auth/login`, {
                email: email,
                password: password,
            }).then(response => {
                localStorage.setItem('token', response.data.token)

                this.$patch({
                    user: response.data.data,
                    isAuthorized: true,
                    isAdmin:true
                })
               const router = useRouter();
               router.push({ path: "/" });
            }).catch(err => {
                console.log(err);
            });

        },
        Auth(){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            axios.get(BASE_URL+`/api/user/profile`).then(response => {
                localStorage.setItem('token', response.data.data.token)
                this.$patch({
                    user: response.data.data,
                    isAuthorized: true,
                    isAdmin:true
                })
            }).catch(err => {
                this.$patch({
                    user: {},
                    isAuthorized: false,
                    isAdmin:false
                })
            });
        }
    },
})