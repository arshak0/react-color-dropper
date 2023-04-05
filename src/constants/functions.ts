export function rgb2hex(rgb: string){
    let rgbRegularExpression = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgbRegularExpression && rgbRegularExpression.length === 4) ? "#" +
        ("0" + parseInt(rgbRegularExpression[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbRegularExpression[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbRegularExpression[3],10).toString(16)).slice(-2) : '';
}

export function randomizeArray(){
    let finalArray=[]
    for (let ii=0; ii<=10; ii++) {
        let arrayRow = []
        for (let jj=0; jj<=10; jj++) {
            arrayRow.push(`#${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}`)
        }
        finalArray.push(arrayRow)
    }

    return finalArray
}