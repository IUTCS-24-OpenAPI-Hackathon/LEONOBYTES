export const checkLogin = () => {
    const token = localStorage.getItem('hackInShellAccessToken');
    return (token == null || token == undefined || token == "");
};