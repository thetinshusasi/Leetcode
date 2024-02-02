


function characterReplacement(s: string, k: number): number {

  if (!s || !s.length) return 0

  let firstPtr = 0
  let secPtr = 0
  const strLen = s.length

  let charCountHashmap: Dict = {}
  let maxLenCount = 0
  let prevValue = null
  while (firstPtr < strLen && secPtr < strLen) {
    if (charCountHashmap[s[secPtr]] && prevValue !== secPtr) {
      charCountHashmap[s[secPtr]] = charCountHashmap[s[secPtr]] + 1
    }
    if (!charCountHashmap[s[secPtr]]) {
      charCountHashmap[s[secPtr]] = 1
    }

    const windowLen = secPtr - firstPtr + 1
    const countOfMaxRepeatedChar = Math.max(...(Object.values(charCountHashmap)))

    const isWindowValid = (windowLen - countOfMaxRepeatedChar) <= k
    prevValue = secPtr

    if (isWindowValid) {
      if (windowLen > maxLenCount) {
        maxLenCount = windowLen
      }
      secPtr++
    }
    else {
      charCountHashmap[s[firstPtr]] = charCountHashmap[s[firstPtr]] - 1
      firstPtr++


    }



  }

  return maxLenCount

};

console.log(characterReplacement("AABABBA", 1))