export function namedPlaceholders(query:string, values:any) {
    if (!values) {
        return query;
    }
    return query.replace(/:(\w+)/g,
        (match, key)=>
            values[key] || null);
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
