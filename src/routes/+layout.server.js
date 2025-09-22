// src/routes/+layout.server.js
export function load({ cookies, url }) {
    const token = cookies.get('accessToken');
    const userDataCookie = cookies.get('userData');
    let userData = null;
    
    if (userDataCookie) {
        try {
            userData = JSON.parse(userDataCookie);
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }

    return {
        isLoggedIn: !!token,
        userData,
        currentPath: url.pathname
    };
}