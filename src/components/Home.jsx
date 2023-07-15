import React, { useRef, useState } from 'react'
import { FaClipboard } from 'react-icons/fa';

function Home() {
    const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerSet = "abcdefghijklmnopqrstuvwxyz"
    const numberSet = "1234567890"
    const symbolSet = "~!@#$%^&*()_+/"

    const upper = useRef(null)
    const lower = useRef(null)
    const number = useRef(null)
    const symbol = useRef(null)
    const charInput = useRef(null)
    const getPasswordInput = useRef(null)

    const [showAlert, setShowAlert] = useState(false);


    const getData = (dataSet) => {
        return dataSet[Math.floor(Math.random() * dataSet.length)]
    }

    const generatePassword = (password = "") => {
        if (upper.current.checked) {
            password += getData(upperSet)
        }
        if (lower.current.checked) {
            password += getData(lowerSet)
        }
        if (number.current.checked) {
            password += getData(numberSet)
        }
        if (symbol.current.checked) {
            password += getData(symbolSet)
        }
        if (password.length < charInput.current.value) {
            return generatePassword(password)
        }
        getPasswordInput.current.value = truncateString(shuffleString(password), charInput.current.value)
    }
    function shuffleString(inputString) {
        return inputString.split('').sort(() => Math.random() - 0.5).join('');
    }
    function truncateString(str, num) {
        if (str.length > num) {
            let subStr = str.substring(0, num);
            return subStr;
        } else {
            return str;
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        generatePassword()

    }
    function copyTextFromInput(inputText) {
        navigator.clipboard.writeText(inputText)
    }

    const handleCopy = () => {
        if (getPasswordInput.current.value) {
            const inputText = getPasswordInput.current.value;
            copyTextFromInput(inputText);

            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }



    };

    return (
        <>
         {showAlert && (
        <div className="alert alert-success" role="alert">
          Password copied successfully!!
        </div>
      )}
        
        <div className='text-center'>
         
            <h1 style={{color:"#EEE3DC",marginTop:"100px"}}>Password Generator</h1>
            <div className='container d-flex justify-content-center flex-column   shadow-sm py-3' style={{ marginTop: "100px", backgroundColor: "#EEE3DC", width:"350px" }}>

                <div className="input-group">
                    <input type="text" className="form-control" ref={getPasswordInput} />
                    <button onClick={handleCopy} className="btn" style={{ border: "1px solid #123C69" }} type="button"> <FaClipboard style={{ color: "#123C69" }} /></button>
                </div>


                <div className='my-4'>
                    <div className='d-flex justify-content-between my-1'>
                        <span>Password Length</span>
                        <input className="form-check-input" style={{ width: "30px" }} type="text" ref={charInput} />
                    </div>
                    <div className='d-flex justify-content-between my-1'>
                        <span>Contains Uppercase</span>
                        <input className="form-check-input" type="checkbox" ref={upper} />
                    </div>
                    <div className='d-flex justify-content-between my-1'>
                        <span>Contains Lowercase</span>
                        <input className="form-check-input" type="checkbox" ref={lower} />
                    </div>
                    <div className='d-flex justify-content-between my-1'>
                        <span>Contains Numbers</span>
                        <input className="form-check-input" type="checkbox" ref={number} />
                    </div>
                    <div className='d-flex justify-content-between my-1'>
                        <span>Contains Symbols</span>
                        <input className="form-check-input" type="checkbox" ref={symbol} />
                    </div>
                </div>


                <button type="button" onClick={handleClick} className="btn" style={{ backgroundColor: "#123C69", color: "white" }}>Generate</button>

            </div>
        </div>
        </>
    )
}

export default Home