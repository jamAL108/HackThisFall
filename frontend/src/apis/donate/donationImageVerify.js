import { NeurosNeureloAPI } from '../../utils/nerelo'
const donationImage = async (formdata)=>{
    try{
        console.log(formdata)
        const {  objectID , imageUrl } = formdata
        const foodobjFound = await fetch(`https://ap-south-1.aws.neurelo.com/rest/foodDonor/${objectID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': NeurosNeureloAPI
            },
            body: JSON.stringify({ "img_url": imageUrl})
        });
        const responseData = await foodobjFound.json();
        console.log(responseData)
        return responseData
    }catch(err){
       return err
    }
}

export default donationImage