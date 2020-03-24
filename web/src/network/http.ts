import axios from 'axios';

const axiosIns = axios.create({
  baseURL: 'localhost:3000/api'
});

export const submitEquationTotalInfo = (totalInfo: {
  iterationFn: string;
  iterationMethod: string;
}) => {
  return axiosIns.get('/submit', {
    data: totalInfo
  });
};
