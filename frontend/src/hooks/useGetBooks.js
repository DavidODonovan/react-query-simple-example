import { useQuery } from 'react-query';
import axios from 'axios';

const getBooks = async () => {
  const { data } = await axios.get("http://127.0.0.1:4000/books");
  return data;
};

const useGetBooks = ()=>{
  return  useQuery('books', getBooks);
};

export default useGetBooks;
