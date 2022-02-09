import { useState, useEffect } from 'react';
import { updateBook } from '../../../apis/booksApi';
import { useQueryClient, useMutation } from 'react-query';
import useEditBook from '../../../hooks/useEditBook';

const EditBookForm=({book, setIsEditing})=>{
  const [fields, setFields] = useState({...book});

  const {mutate} = useEditBook()

  const handleChange=(e)=>{
    const {name, value} = e.target;
    setFields({...fields, [name]: value})
  };

  const handleSubmit= async (e)=>{
    e.preventDefault();
    mutate(fields);
    setIsEditing();
  };

  return (
    <div style={{border: '10px solid hsla(240, 30%, 90%, 1)'}}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">title: </label>
        <input
          name='title'
          onChange={handleChange}
          style={{ width: '300px'}}
          type="text"
          value={fields.title}/>
        <br/>
        <label htmlFor="">author: </label>
        <input
          name='author'
          onChange={handleChange}
          style={{ width: '300px'}}
          type="text"
          value={fields.author}/>
        <br/>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
};

export default EditBookForm;
