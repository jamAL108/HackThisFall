
import { NeurosNeureloAPI } from '../../utils/nerelo'
// import { Vonage } from '@vonage/server-sdk';
// const vonage = new Vonage({
//     apiKey: "402a59c2",
//     apiSecret: "fesgSkLe1YZv1jyt"
// });



function generateRandom4DigitNumber() {
    // Generate a random number between 1000 and 9999 (inclusive)
    return Math.floor(1000 + Math.random() * 9000);
}

const register = async  (formdata) =>{
    try {
        const { email, password, phone, fullname } = formdata;
        if (!email || !password || !fullname || !phone) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        } else {
            const response = await fetch('https://ap-south-1.aws.neurelo.com/rest/users/__one', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": NeurosNeureloAPI
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    phone: phone,
                    fullname: fullname
                })
            });

            const data = await response.json();
            const random4DigitNumber = generateRandom4DigitNumber();
            otpforuser = random4DigitNumber;
            const from = "Neuros"
            const to = phone
            const text = random4DigitNumber;

            async function sendSMS() {
                await vonage.sms.send({ to, from, text })
                    .then(resp => { console.log('Message sent successfully'); console.log(resp); })
                    .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
            }

            sendSMS();
            res.json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default register