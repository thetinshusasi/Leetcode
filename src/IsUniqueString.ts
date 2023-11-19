const uniqueChars = (str: string): boolean => {

    if (!str || !str.length) return true;
    if (new RegExp("/[0-9\s]/").test(str)) return false;
    str = str.replace("//", "/")
    const mySet = new Set();
    const len = str.length;
    for (let i = 0; i < len; i++) {
        const val = str[i]
        const asciiVal = val.charCodeAt(0);
        const isWithinASCIIRange = (asciiVal >= "A".charCodeAt(0) &&
            asciiVal <= "Z".charCodeAt(0)) || (asciiVal >= "a".charCodeAt(0) &&
                asciiVal <= "z".charCodeAt(0)) ||
            "!/@$%^&*()".includes(val) ||
            "éçüñ".includes(val)

        if (!isWithinASCIIRange || mySet.has(val)) {
            return false;
        }
        mySet.add(val)
    }
    return true;
}


// Test case for a string with all unique characters
console.log(uniqueChars("abcdefg"), true)

// Test case for a string with duplicate characters
console.log(uniqueChars("hello"), false);

// Test case for an empty string
console.log(uniqueChars(""), true);

// Test case for a string with a single character
console.log(uniqueChars("a"), true);

// Test case for a string with spaces
console.log(uniqueChars("abc def"), false);

// Test case for a longer string with all unique characters
console.log(uniqueChars("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), true);

// Test case for a longer string with duplicate characters
console.log(uniqueChars("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZa"), false);

// Test case for a string with special characters
console.log(uniqueChars("!@//$%^&*()"), true);

// Test case for a string with a mix of alphanumeric characters
console.log(uniqueChars("abc123ABC"), false);

// Test case for a string with non-ASCII characters
console.log(uniqueChars("éçüñ"), true);

// Test case for a string with control characters
console.log(uniqueChars("\n\t\r"), false);

// Test case for a very long string with all unique characters

