import Cookies from 'js-cookie';

export async function saveToken(token: string) {
    Cookies.set('token', token);
}