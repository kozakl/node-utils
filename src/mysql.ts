export function namedPlaceholders(query:string, values:any) {
    if (!values) {
        return query;
    }
    return query.replace(/:(\w+)/g, (txt, key)=> {
        if (values.hasOwnProperty(key)) {
            return values[key];
        }
        return txt;
    });
}

export function validateField(field:string,
                              validFields:string[],
                              defaultField = 'id') {
    if (!field) {
        return defaultField;
    }
    return validFields.includes(field) ? field : defaultField;
}

export function validateFields(fields:string,
                               validFields:string[],
                               defaultFields = '*') {
    if (!fields) {
        return defaultFields;
    }
    const result = fields
        .split(',')
        .filter((item)=>
            validFields.includes(item));
    return result.length ? result :defaultFields;
}
