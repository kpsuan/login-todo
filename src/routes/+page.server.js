import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const token = cookies.get('accessToken');
    
    // If user is logged in, redirect to todo page
    if (token) {
        throw redirect(307, '/todo');
    }
    
    // If not logged in, redirect to login page
    throw redirect(307, '/login');
}
