export function numPrettify (value) {
  const bonus = String(value) 
  return bonus.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
}