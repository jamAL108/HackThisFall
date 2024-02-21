import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { Vonage } from '@vonage/server-sdk';
import cookieParser from 'cookie-parser';
const NeurosNeureloAPI = "neurelo_9wKFBp874Z5xFw6ZCfvhXZH8GU9yMby3mNWr15J/8WE5yaeauMToB2FqPUjfCQxrHs7B8mkffiaR16UtaK8o3XuuCHSSGjLsNXzbKfSpg1ER3zy8PRVq59eH9eBa5pRyjLXyUsJgIZ3m6gYiF1NNDmuMLrmzIeQxODCsHiq55mxGJYt97xQe+Ig3bp5XxKMi_4FkAzJuRE3gcdCWuSFbBALPoqmD0reX9H0uJ+RrYSGs=";

const vonage = new Vonage({
    apiKey: "402a59c2",
    apiSecret: "fesgSkLe1YZv1jyt"
});
let otpforuser;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.post('/verifyOTP', async (req, res) => {
    try {
        const { reqID, otp } = req.body;
        if (otpforuser == otp) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/queryStorage', async (req, res) => {
    try {
        const { email, comment } = req.body;
        if (!email || !comment) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        } else {
            axios.post('https://ap-south-1.aws.neurelo.com/rest/queries/__one', {
                comment: comment,
                email: email
            }, {
                headers: {
                    "X-API-KEY": NeurosNeureloAPI
                }
            })
                .then(response => {
                    res.status(200).json({ message: 'Successfully submitted query!' })
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ error: 'Error submitting query' });
                });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
function generateRandom4DigitNumber() {
    // Generate a random number between 1000 and 9999 (inclusive)
    return Math.floor(1000 + Math.random() * 9000);
}

app.post('/registerUser', async (req, res) => {
    try {
        const { email, password, phone, fullname } = req.body;
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
});


// https://ap-south-1.aws.neurelo.com/rest/users?filter={"email":email, "password":password}


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        } else {
            const response = await fetch(`https://ap-south-1.aws.neurelo.com/rest/users?filter={"email":${email}, "password":${password}}`);
            if (email == response.email && password == response.password) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



app.post('/donorformsubmission', async (req, res) => {
    try {
        const { foodname, donorname, phone, description } = req.body;
        if (!foodname || !donorname || !phone || !description) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        } else {
            const alluserdetails = localStorage.getItem('BHOJNA_user');
            const userID = alluserdetails.id;
            const response = await fetch('https://ap-south-1.aws.neurelo.com/rest/foodDonor/__one', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": NeurosNeureloAPI
                },
                body: JSON.stringify({
                    foodname: foodname,
                    description: description,
                    phone: phone,
                    donorname: donorname,
                    userID: userID
                })
            })
            res.status(200).json({ "message": 'Donation done' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/donationsGet', async (req, res) => {
    try {
        const alldata = await fetch('https://ap-south-1.aws.neurelo.com/custom/show_donations', {
            headers: {
                "X-API-KEY": NeurosNeureloAPI
            }
        });

        const data = await alldata.json();

        res.json(data.data.cursor.firstBatch);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.patch('/ngoIDupdate', async (req, res) => {
    const { objectID, ngokaID } = req.body;
    // console.log(ngokaID, objectID);

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

    res.status(200).json(responseData);

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});