const axios = require('axios');

const makeRequest = async (hash) => {

    try {
        const config = {
            headers: {
                'x-apikey': '249b82f0f29a52fb1697cbdf5983a46eb5f9b7ca2477ff189979128f0b499a60'
            }
        }
        const url = 'https://www.virustotal.com/api/v3/files/' + hash + '';

        const response = await axios.get(url, config)
        console.log(response.data)
    } catch (err) {
        console.log(err)
    }


};

module.exports = makeRequest;