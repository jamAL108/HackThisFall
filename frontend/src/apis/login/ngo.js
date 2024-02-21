import { NeurosNeureloAPI } from '../../utils/nerelo'
const loginAPI = async (formdata) =>{
    console.log(formdata)
    const emailID = `"${formdata.email}"`
    const response = await fetch(`https://ap-south-1.aws.neurelo.com/rest/ngo?filter={"email":${emailID}}` , {
        method:"GET",
        headers:{
            "X-API-KEY": NeurosNeureloAPI
        }
    });
    const msg = await response.json()
   const userDataFromAPI = msg.data[0]
    if(formdata.email == userDataFromAPI.email && formdata.password == userDataFromAPI.password){
        localStorage.setItem("BHOJNA_ngo" , JSON.stringify(msg.data[0]))
        return {success:true}
    }else{
        return {success:false}
    }
}

export default loginAPI

