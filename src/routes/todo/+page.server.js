import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const token = cookies.get('accessToken');
    if (!token) throw redirect(303, '/login');

    // Get user data from cookies
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
        token,
        userData
    };
}

export const actions = {
    logout: async ({ cookies }) => {
        // Clear authentication cookies
        cookies.delete('accessToken', { path: '/' });
        cookies.delete('userData', { path: '/' });
        
        throw redirect(303, '/login');
    }
};
