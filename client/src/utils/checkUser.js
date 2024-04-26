import { jwtDecode } from "jwt-decode";
import { checkLogin } from "./checkLogin";
export const checkUser = () => {
    let loggedIn = checkLogin();
    
    if (!loggedIn) {
        const token = localStorage.getItem('hackInShellAccessToken');
        if (token) {
            const user = jwtDecode(token);
            return user;
        }
    }
    return [];

};