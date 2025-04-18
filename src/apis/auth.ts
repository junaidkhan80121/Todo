import axios from "axios";
import { BASEURL, AUTHURL } from "../constants/urls";


export const signupAPI = async(username:string,password:string)=>{
    return await axios.post(`${BASEURL}/${AUTHURL}/signup`,{email:username.toLowerCase(),password:password},{withCredentials:true});
}

export const loginAPI = async(email:string,password:string)=>{
  return await axios.post(`${BASEURL}/${AUTHURL}/login`,{email:email.toLowerCase(),password:password},{withCredentials:true})
}

export const logoutAPI = async()=>{
  return await axios.get(`${BASEURL}/${AUTHURL}/logout`,{withCredentials:true})
}

export const refreshTokenAPI = async()=>{
  return await axios.get(`${BASEURL}/${AUTHURL}/refreshtoken`,{withCredentials:true});
  
}