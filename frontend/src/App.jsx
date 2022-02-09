import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';

const queryClient = new QueryClient();

const Grid = ({children})=>{
  return (
    <div style={{
      border: '10px solid red',
      height: '90vh',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr'
    }}>
      {children}
    </div>
  );
};

// QueryClientProvider captures all incoming xhr responses and manages caching?
function App() {
  const [bookId, setBookId] = useState('');
  return (
        <QueryClientProvider client={queryClient}>
          {bookId}
          <Grid>
            <BookList setBookId={setBookId}/>
            <BookDetail bookId={bookId}/>
          </Grid>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
  )
}

export default App;
