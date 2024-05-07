import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(true)
  const [charAllow, setCharAllow] = useState(true)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordInput = useRef(null);

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllow) str +=  "0123456789" //shorthand notation if statement
    if (charAllow) str += "!@#$%^&*-_+=[]{}~`" //add special characters to string

    for (let i=1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllow, charAllow, setPassword])

  const copyToClipboard = useCallback( () => {
    passwordInput.current?.select();
    passwordInput.current?.setSelectionRange(0,101); //range of selection
    window.navigator.clipboard.writeText(password)
    .then (()=> alert("Passowrd copied!"))
    .catch((err)=> console.log(err));
  
  }, [password] )
  
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, charAllow, passwordGenerator])


  //regenerate password function
  const regenHandler = useCallback ((e) => {
    e.preventDefault()
    passwordGenerator()
  })

  return (
    <>
      <div className="w-full max-w-xl mx-auto text-lg shadow-md rounded-lg px-3 py-6 my-8 text-orange-500 bg-gray-700 ">
        <h1 className='text-center text-white text-4xl my-3 font-bold'>Password Generator</h1>
        <div className='flex shadow rounded-lg mb-4 overflow-hidden '>
          <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3' 
          placeholder='Password' 
          readOnly 
          ref={passwordInput}
          />
          <button onClick={copyToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' >Copy</button>
        </div>
        <div className='flex flex-wrap text-sm gap-x-2'> 
          <div className='flex flex-wrap items-center gap-x-1 text-lg '>
            <input 
            type="range" 
            min={6} max={100} 
            value={length} 
            className='cursor-pointer' 
            onChange={(e)=>{setlength(e.target.value)}}/>
            <label className='-mt-1'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1 text-lg">
            <input
            type="checkbox"
            defaultChecked={numberAllow}
            id="numberInput"
            onChange={() => {setNumberAllow((prev) => !prev);}}
            />
            <label className='-mt-1'  htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex flex-wrap items-center gap-x-1 text-lg">
            <input 
            type="checkbox"
            defaultChecked={charAllow}
            id="characterInput"
            onChange={() => {setCharAllow((prev) => !prev )}}
            />
          <label className='-mt-1' htmlFor="characterInput">Characters</label>
          </div>
          
        </div>
        <div className="grid place-content-center mt-7" >
        <button className="bg-white rounded-xl w-48 " onClick={regenHandler}>
            Click to Generate New Password
        </button>
        </div>
      </div>
    </>
  )
}

export default App