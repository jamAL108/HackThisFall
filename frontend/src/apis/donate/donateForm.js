import { NeurosNeureloAPI } from '../../utils/nerelo'

const donateuser = async (formdata) =>{
    try {
        const { foodname, donorname, phone, description , address } = formdata;
        if (!foodname || !donorname || !phone || !description || !address) {
            return {error:"Please fill all the fields"}
        } else {
            const response = await fetch('https://ap-south-1.aws.neurelo.com/rest/foodDonor/__one', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": NeurosNeureloAPI
                },
                body: JSON.stringify({
                    foodname: foodname,
                    description: description,
                    donorname: donorname,
                    address:address
                })
            })
            console.log(await response.json())
            return {"message":"Donation Done"}
        }
    } catch (error) {
        console.log(error);
        return {"error":error}
    }
}

export default donateuser