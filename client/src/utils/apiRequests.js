import axios from 'axios';

export const getRequests = async (url) => {
    const data = await axios
        .get(url)
        .then(resp => resp.data)
        .catch((err) => (
            {err: err.response.data}
        ))
    return data;
}