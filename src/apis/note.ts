import axios from "axios";
import { getAccessToken } from "../utils/getAccessToken";
import { BASEURL, NOTEURL } from "../constants/urls";


export const deleteNote = async (noteId: string,) => {
  const accessToken = getAccessToken()
    return await axios.delete(`${BASEURL}/${NOTEURL}/deletenote`, {data:{noteId: noteId},headers:{accessToken:accessToken}});
    
  };


export const updateNote = async (noteID: string, title: string, description: string, checked: boolean) => {
  const accessToken = getAccessToken()
    const res = await axios.put(`${BASEURL}/${NOTEURL}/updatenote`, { id: noteID, title: title, description: description, checked: checked,},{withCredentials:true,headers:{accessToken:accessToken}});
    return res;
  };


export const updateNoteStatus = async (noteId:string) => {
  const accessToken = getAccessToken()
    return await axios.patch(`${BASEURL}/${NOTEURL}/updatenotestatus`, {id:noteId},{withCredentials:true,"headers":{"accessToken":accessToken}});
    
  };


export const getNotes = async()=>{
  const accessToken = getAccessToken()
    return await axios.get(`${BASEURL}/${NOTEURL}/`,{withCredentials:true,headers:{accessToken:accessToken}},);
    
}


export const addNote = async(title:string,description:string, checked:boolean)=>{
  const accessToken = getAccessToken()
    return await axios.post(`${BASEURL}/${NOTEURL}/addnote`, {title: title, description: description, checked:checked,},
      {withCredentials:true,headers:{accessToken:accessToken}});

}