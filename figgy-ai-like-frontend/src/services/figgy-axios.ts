import axios from 'axios';

const fliggyAxios = axios.create({ baseURL: '/api' });

export { fliggyAxios };
