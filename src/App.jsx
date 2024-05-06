import { useCallback, useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(1)
  const [numberAllowed,setNumberAllowed] =useState(false)
  const [charAllowed, setCharAllowed] =useState(false)
  const [password, setPassword] =useState('')

  const passwordRef =useRef(null)
  const passwordGenerate = useCallback(() =>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    // let number="0123456789"
    // let Character="!@#$%^&*()_+"

    if(numberAllowed)str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"
    for(let i = 1; i<length; i++){
      const char = Math.floor(Math.random() *str.length +1)
      pass += str.charAt(char)
    }

	// for copy password from clipboard
      setPassword(pass)
    },[length,charAllowed,numberAllowed])
     const copyPassword =()=>{
      window.navigator.clipboard.writeText(password)
      alert('password copied');
      
     }
	// everytime the length,char and number changes it will run as soon as page load
      useEffect(()=> {
        passwordGenerate()
      },[length, charAllowed, numberAllowed])


     
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-300 text-orange-500'>
      <h1 className='text-lime-600 text-center my-3'> Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input
      type="text"
      value= {password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passwordRef}
      />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ' 
      onClick={copyPassword}>Copy</button>
      </div>
        <div className='flex items-center gap-x-1'>
           <input 
            type="range"
            min={8}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=> setLength(e.target.value)}
            name=""
            id=""
            />
            <label htmlFor="length">Length:{length}</label>
            
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prevalue)=> !prevalue)
            }}
          
            />
            <label htmlFor="number">Numbers</label>
            
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            id="characterInput"
            defaultChecked={charAllowed}
            onChange={()=>{
              setCharAllowed((prevalue)=> !prevalue)
            }}
          
            />
            <label htmlFor="number">Character</label>
            
          </div>
        </div>
     
     
    </div>
  )
}

export default App
