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
