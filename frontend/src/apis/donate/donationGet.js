
import { NeurosNeureloAPI } from '../../utils/nerelo'
const donateGet = async ()=>{

    try {
        const alldata = await fetch('https://ap-south-1.aws.neurelo.com/custom/show_donations', {
            headers: {
                "X-API-KEY": NeurosNeureloAPI
            }
        });

        const data = await alldata.json();
        return data.data.cursor.firstBatch
    } catch (error) {
        console.log(error);
        return {"error":"Internal Server Error"}
    }
}

export default donateGet