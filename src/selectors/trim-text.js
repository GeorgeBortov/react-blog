import rtrim  from 'rtrim';

export default (string, max_char) => {
    let str = string.replace(/<(?:.|\n)*?>/gm, '\n').trim();
    if(str.length > max_char) {
        if(str.substr(0, max_char).indexOf(' ')) {
            let string_args = str.split(" ");
            let strArr = '';

            for(let count = 0; count < string_args.length; count++) {
                if((strArr + string_args[count]).length <= max_char) {
                strArr += string_args[count]+' ';
                } else {
                    break;
                }
            }
            // return strArr.replace(/[\.,\s]$/, '...');
            return rtrim(strArr, ' .,')+'...';
        } else {
            string = string.substr(0, max_char);
            return rtrim(strArr, ' .,')+'...';
        }
    } else {
        return str;
    }
}