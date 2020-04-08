export default function wordUpper(arrWords = '', maxLetter = 2) {
  const ignore = ['de', 'da', 'das', 'do', 'dos'];
  arrWords = arrWords.split(' ');
  let name = '';

  arrWords.forEach(word => {
    if (maxLetter > 0) {
      if (ignore.indexOf(word) === -1) name += word.charAt(0).toUpperCase();
      maxLetter -= 1;
    }
  });

  return name;
}
