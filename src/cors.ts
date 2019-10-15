export function whitelist(list:string[])
{
    return (origin:string, resolve:Function)=>
        resolve(null, list.indexOf(origin) !== -1);
}
