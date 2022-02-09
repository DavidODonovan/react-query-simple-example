import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchBookById } from '../../apis/booksApi';

import EditBookForm from './EditBookForm';

const BookDetail=({bookId})=>{

  const [isEditing, setIsEditing] = useState(false);
  // 'book' is a key in a cache setup by useQuery
  const { isLoading, data,  isError, error, isFetching } =
    useQuery(
      ['book', bookId],
      ()=>fetchBookById(bookId),
      {enabled: Boolean(bookId)}
    );

  let Details = (
    <div>
    </div>
  );

  let book;

  if(data){
    book = data.data;
    Details = (
     <div>
       <div><strong>{book.title}</strong></div>
       <div>by</div>
       <div>{book.author}</div>
     </div>
   );
   }


  if (isLoading) return 'Loading...'
  if(isError) return 'something went wrong';
  if (error) return 'An error has occurred: ' + error.message

  if(!bookId){
    return (<div>no book selected</div>)
  }

  return (
    <div style={{ margin: '0 1px', border: '10px solid hsla(0, 10%, 90%, 1)', padding: '1em'}}>
      <div>{ isFetching ? 'refetching in background...': 'fetched'}</div>
      <br/>
      <button
        style={{fontSize:'1em', color: `${isEditing? 'red': 'green'}`}}
        onClick={()=>setIsEditing(!isEditing)}
       >{isEditing? 'Cancel': 'Edit book details'}</button>
      <hr/>
      {isEditing? <EditBookForm book={book} setIsEditing={setIsEditing}/>: Details}

    </div>
  )
};

export default BookDetail;
