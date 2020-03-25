import axios from 'axios';

const axiosIns = axios.create({
  baseURL: '/api'
});

export const submitEquationTotalInfo = (totalInfo: any) => {
  return axiosIns.get('/submit', {
    params: totalInfo
  });
};
