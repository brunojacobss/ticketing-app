import axios from 'axios';
import { AppContext } from 'next/app';

const buildClient = ({ ctx: { req } }: AppContext) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL: 'http://www.ticketing-prod-bjs.xyz/',
      headers: req.headers,
    });
  } else {
    // We are on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
