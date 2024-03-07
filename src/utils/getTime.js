const getTime = (num) => {9
    const sec = num % 60;
    const min = (num - sec) / 60;

    return min + ":" + (sec < 10? '0':'') + sec; 
}

export default getTime