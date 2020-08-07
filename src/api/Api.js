import axios from 'axios';
import getEnv from "../environment";

const {API, API_VERSION} = getEnv();

export default axios.create({
    baseURL: `${API}/${API_VERSION}`,
});
