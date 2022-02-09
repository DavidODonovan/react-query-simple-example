import axios from 'axios';
import useGetBooks from '../../hooks/useGetBooks';

const ListItem = ({children})=>{
  return (
    <li style={{
      border: '2px solid hsla(0, 10%, 80%, 1)',
      borderRadius: '3px',
    }}>
      <div>{children}</div>
    </li>
  )
};

const BookList=({setBookId})=>{
  // 'books' is a key in a cache setup by useQuery
  const { isLoading, data, isError, error} = useGetBooks();

  if (isLoading) return 'Loading...'
  if(isError) return 'something went wrong';
  if (error) return 'An error has occurred: ' + error.message


  return (
    <div style={{ border: '10px solid hsla(0, 10%, 90%, 1)'}}>
      <ul style={{listStyle: 'none', padding: 0}}>{
        data?.map((d, i)=>{
          return (
            <ListItem key={d.id}>
              <button type="button" onClick={()=>setBookId(d.id)}
                style={{cursor: 'pointer', fontSize: '1em', width: '100%', height: '100px'}}
                >
                 <strong style={{color: 'red'}}>{d.title}</strong><br/> by {d.author}
              </button>
            </ListItem>
          )
        })
      }</ul>
    </div>
  )
};

export default BookList;
