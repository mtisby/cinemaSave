import './App.css';
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import { getPosts } from './actions/posts'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
