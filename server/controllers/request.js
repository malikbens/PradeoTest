const axios = require('axios');
const db = require('../db');

const makeRequest = async (hash) => {

    try {
        const config = {
            headers: {
                'x-apikey': '249b82f0f29a52fb1697cbdf5983a46eb5f9b7ca2477ff189979128f0b499a60' // I will not do that in production I promise
            }
        }
        const url = 'https://www.virustotal.com/api/v3/files/' + hash + '';

        const response = await axios.get(url, config)

    
        const malicious = response.data.data.attributes.last_analysis_stats.malicious;
        if(malicious == "0"){
            data = ['sur', hash]
            db.updateStatus(data);
        }else{
            data = ['virus', hash]
            db.updateStatus(data)
        }
        
    } catch (err) {
        console.log(err)
    }

};

module.exports = makeRequest;