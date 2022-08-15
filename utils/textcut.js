export  const textCut = (text, numberChars) =>{
    if(text.length > numberChars) {
        const string = text.substring(0, numberChars) + "...";
        return string
    }
    return text
}; 