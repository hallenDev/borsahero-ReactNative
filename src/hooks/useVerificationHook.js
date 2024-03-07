import { useState, useEffect } from 'react';

export default function useVerificationHook (codeLength) {
    
    let [code, setCode] = useState('');    
    let [selectID, setSelectID] = useState(0);
    let [_empty, setEmpty] = useState(true);
    let inputStates = [];

    useEffect(() => {
        let finalCode = inputStates.map((input) => {
                            return input.digit;
                        }).join("");        
        // if (finalCode.length === codeLength) {
        //     setCode(finalCode);
        // } else setCode(null);
        setCode(finalCode);
    }, [inputStates]);

    for (let i = 0; i < codeLength; i++) {
        const [digit, setDigit] = useState("");
        inputStates.push({ digit, setDigit });
    }

    const handleChange = (e, index) => {
        let entry = e;
        setEmpty(false)

        if(entry.length == 6 && !Number.isNaN(entry) && index == 0) {
            for(let i = 0; i < 6; i ++ ) {
                inputStates[i].setDigit(entry[i]);
                setSelectID(5);
            }
        } else if (entry.length <= 1 && !Number.isNaN(entry)) {
            inputStates[index].setDigit(e);
            if (entry.length > 0) {
                setSelectID(index < 5? index + 1: 5);
            }
        } else {
            setSelectID(index < 5? index + 1: 5);
        }
    };

    const handleFocus = (index) => {
        setSelectID(index)
    }

    const handleKeyDown = (key, index) => {
        if (_empty) {
            if (key == 'Backspace') {
                inputStates[index - 1].setDigit("");
                setSelectID(index > 0? index - 1: 0)
            } else {
                inputStates[index].setDigit(key);
                setSelectID(index < 5? index + 1: 5);
            }
        } else {
            if (key == 'Backspace') {
                inputStates[index].setDigit("");
            } 
        }
        setEmpty(true)
    }

	return { code, selectID, inputStates, handleFocus, handleChange, handleKeyDown };
}