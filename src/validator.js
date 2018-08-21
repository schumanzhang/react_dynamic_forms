export default function validator(fields, formData) {
    for (let field in fields) {
        let obj = findValidateObject(field, formData);
        console.log(obj);
    }
    return false;
}

function findValidateObject(name, formData) {
    for (let item in formData) {
        if (item.name === name) {
            return item['validation'];
        }
    }
}