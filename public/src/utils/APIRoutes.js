export const APIURL = (process.env.hasOwnProperty("NODE_ENV")) ? 
"68.118.217.102:3010" : "localhost:5000";
export const host = `http://${APIURL}`;
export const loginRoute =   `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
