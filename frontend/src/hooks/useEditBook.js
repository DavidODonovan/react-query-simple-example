import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:4000/socks';

export const updateBook = async (payload)=>{
  console.log("payload is....", payload)
  const response = await axios.put(`${BASE_URL}/${payload.id}`, payload);
  return response;
};

const useEditBook = ()=>{
  const queryClient = useQueryClient();

  return useMutation(
    updateBook,
    {

      onMutate: async (newBook)=>{
        // prevent any current refetches so that they don't overwrite our optimistic update
        await queryClient.cancelQueries('book');

        // get current state in case we need to rollback state on request error
        const prevCachedQuery = queryClient.getQueryData(['book', newBook.id]);

        queryClient.setQueryData(['book', newBook.id], (prev)=>{
          return {...prev, data: {...newBook}}
        })
      },

      onError: (_error, _requestData, context)=>{
        // rollback to prev state using 'context', which seems to refer to this object inside the function when it is invoked.
        console.log('contextlllllllllll', _context)
        console.log('errorrrrrrrrr', _error)
        queryClient.setQueryData(['book', newBook.id], context.prevCachedQuery);
      },

      onSettled: (thing)=>{
        // not sure what this does yet.
        queryClient.invalidateQueries('book');
      }
    }
  );

};

export default useEditBook;
