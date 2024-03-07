export const CREDIT_CARD_MASK = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
]

export const EXP_MASK = (text = '') => {
  const cleanText = text.replace(/\D+/g, '')

  let secondDigitMonthMask = /\d/

  if (cleanText.charAt(0) === '0') {
    secondDigitMonthMask = /[1-9]/
  }
  if (cleanText.charAt(0) === '1') {
    secondDigitMonthMask = /[012]/
  }

  return [/[0-1]/, secondDigitMonthMask, '/', /\d/, /\d/]
}
