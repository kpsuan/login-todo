// src/lib/store/userStore.js
import { writable } from "svelte/store";

export const user = writable({
    isLoggedIn: false,
    token: null,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    image: ''
});

export function setUser(data) {
    user.set({
        isLoggedIn: true,
        token: data.accessToken,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        image: data.image
    });
}

export function logout() {
    user.set({
        isLoggedIn: false,
        token: null,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        image: ''
    });
}
