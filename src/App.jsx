import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
    setIsCopied(false)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setIsCopied(true)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className='w-full h-screen bg-[#001524] font-poppins flex justify-center  items-center text-[white] '>
        <div className='sm:border px-8 py-10 sm:rounded-lg sm:shadow-2xl '>
          <h1 className='text-700 text-3xl'>Random password generator..</h1>
          <input type='text' value={password} className='outline-none bg-transparent w-full border-b-2 border-slate-300 mt-10 p-2 text-xl' readOnly />
          <section className='flex flex-row justify-center items-center flex-1 w-full gap-4 mt-6'>

            <input type='range' min={8} max={50} value={length} className='w-full text-white cursor-pointer accent-slate-100 outline-none'
              onChange={(e) => { setLength(e.target.value) }}
              ref={passwordRef}
            />

            <label>Length:{length}</label>

          </section>
          <button
            className='mt-8 w-full py-4 text-center rounded-lg bg-[#176B87] text-600 hover:bg-[#445D48]'
            onClick={copyPasswordToClipboard}
          >
            {isCopied ? 'Copied!!' : 'Copy password'}
          </button>
          <section className='flex  flex-row mt-6 justify-around items-center gap-2'>
            <section className='flex gap-3'>

              <input
                type='checkbox'
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => { setNumberAllowed((pre) => !(pre)) }}
              />
              <label htmlFor='numberInput'>Digits</label>
            </section>
            <section className='flex gap-3'>
              <input
                type='checkbox'
                defaultChecked={charAllowed}
                id='numberInput'
                onChange={() => { setCharAllowed((pre) => !(pre)) }}
              />
              <label htmlFor='numberInput'>Symbols  (!@#$%^&*)</label>
            </section>
          </section>
        </div>
      </div>
    </>
  )
}

export default App
