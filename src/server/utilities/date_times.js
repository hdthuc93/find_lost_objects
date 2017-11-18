

function changeToYYYYMMDD(dateInput) {
    
    if(!dateInput)
        return undefined;

    let elements = dateInput.split(/\/|-/);
    const date = elements[0];
    const month = elements[1];
    const year = elements[2];

    if(Number(year) < 1000)
        return dateInput;

    let result = year.toString();

    if(month < 10) {
        result += '-0' + month.toString();   
    } else {
        result += '-' + month.toString();
    }

    if(date < 10) {
        result += '-0' + date.toString();   
    } else {
        result += '-' + date.toString();
    }

    return result;
}

function changeToDDMMYYYY(dateInput) {
    if(!dateInput)
        return undefined;

    const dateObj =  new Date(dateInput);
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    const date = dateObj.getUTCDate();

    let result = '';

    if(date < 10) {
        result += '0' + date.toString();   
    } else {
        result += date.toString();
    }

    if(month < 10) {
        result += '-0' + month.toString();   
    } else {
        result += '-' + month.toString();
    }

    result += '-' + year.toString();

    return result;
}

export default { changeToYYYYMMDD, changeToDDMMYYYY };