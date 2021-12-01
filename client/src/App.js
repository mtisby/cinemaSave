import './App.css';
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { getPosts } from './actions/posts'

import { Movies } from './components/Movies';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  return (
    <div className="App">
      <Movies />
    </div>
  );
}

export default App;
