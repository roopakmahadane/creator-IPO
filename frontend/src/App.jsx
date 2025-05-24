import { useState } from 'react'

import './App.css';
import './components/Header'
import Header from './components/Header';
import TopCreators from './components/TopCreators';


function App() {


  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />
    <TopCreators />
    </div>
  )
}

export default App
