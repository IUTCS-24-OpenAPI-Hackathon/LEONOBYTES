import { checkLogin } from "./checkLogin";
export const checkUser = () => {
    let loggedIn = checkLogin();
    
    if (!loggedIn) {
        const token = localStorage.getItem('hackInShellAccessToken');
        return token;
    }
    return [];

};