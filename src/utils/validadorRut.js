export function validateRUT(rut) {
    if (typeof rut !== 'string' && typeof rut !== 'number') {
      console.log(typeof rut)
      throw new TypeError('Input parameter must be of type string or integer')
    }
  
    const cleanRUT = typeof rut === 'string' ? clearRUT(rut) : String(rut)
    const checkDigit = [...cleanRUT].slice(-1)[0]
    const withoutCheckDigitRUT = cleanRUT.slice(0, -1)
    const obtainedCheckDigit = getCheckDigit(withoutCheckDigitRUT)
  
    return checkDigit.toLowerCase() === obtainedCheckDigit.toLowerCase()
}

function getCheckDigit(rut) {
    const cleanRUT = clearRUT(rut)
    const reversedRUT = [...String(cleanRUT)].map(v => parseInt(v)).reverse()
    let result = 0
  
    for (let i = 0, j = 2; i < reversedRUT.length; i++, j < 7 ? j++ : j = 2) {
      result += reversedRUT[i] * j;
    }
  
    return (11 - (result % 11)) <= 9 ? String((11 - (result % 11))) : 'K'
}

function clearRUT(rut) {
    return String(rut).replace(/[^0-9a-z]/gi, '');
}