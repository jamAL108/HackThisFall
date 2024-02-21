import { NeurosNeureloAPI } from '../../utils/nerelo'

const donationAccept = async (formdata) =>{

    

    const { objectID, ngokaID } = formdata;

    const updatedNGO = await fetch(`https://ap-south-1.aws.neurelo.com/rest/foodDonor/${objectID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': NeurosNeureloAPI
        },
        body: JSON.stringify({ "ngo_id": ngokaID })
    });
    const responseData = await updatedNGO.json();
   
    const sendNGO = await fetch(`https://ap-south-1.aws.neurelo.com/rest/ngo/${ngokaID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': NeurosNeureloAPI
        }
    });
    const data = await sendNGO.json();
    const from = "Neuros"
    const to = `91${data.data.phone}`
    const text = `${data.data.name} has accepted your request and they will be donating your food`;

    async function sendSMS() {
        await vonage.sms.send({ to, from, text })
            .then(resp => { console.log('Message sent successfully'); console.log(resp); })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
    }

    sendSMS();

    return responseData
}

export default donationAccept