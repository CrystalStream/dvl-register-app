export default function (str, padNumber = 2, padItem = '0') {
  if (str.length > padNumber - 1) return str

  let padPart = ''
  for (let i = 1; i < padNumber; i++) {
    padPart += padItem;
  }

  return padPart + str
}
