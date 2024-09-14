import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import useSWR from "swr";

export default function useResourceTenants(){
  const apiEndPoint = 'https://djang-backend-final-project.onrender.com/api/v1/users/'
  const {tokens} = useContext(AuthContext);
  const {data,err,mutate} = useSWR([apiEndPoint,tokens],fetchResource);

  // Utility Function
  function config(){
    return {
      headers : {
        'Content-Type' : 'Application/json',
        'Authorization' : 'Bearer ' + tokens.access

      }
    }

  
  }

  

  async function fetchResource(){
    if (!tokens){
      return
    }
    try{
      const res = await fetch(apiEndPoint,config())
      const jsonRes = res.json()
      console.log(jsonRes)
      return jsonRes
    } catch(err){
      console.log(`error fetch data, ${err}`)
    }
  }

  return {
    fetchTenantsData:data,
    loading: tokens && !err && !data,
    error : err
  }
}