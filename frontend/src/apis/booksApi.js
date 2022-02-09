import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:4000/books'

export const fetchBooks = async ()=>{
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    return error;
  };
};

export const fetchBookById = async (id)=>{
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    return error;
  };
};

export const updateBook = async (payload)=>{
  try {
    const response = await axios.put(`${BASE_URL}/${payload.id}`, payload);
    return response;
  } catch (error) {
    return error;
  };
};


export const deleteBook = async (id)=>{
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    return error;
  };
}
