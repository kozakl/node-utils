import {readdirSync, statSync} from 'fs-extra';
import {extname, join} from 'path';

export function listFiles(dir:string, filter?:string[], files:string[] = [])
{
    readdirSync(dir).forEach((file)=> {
        if (statSync(join(dir, file)).isDirectory())
            listFiles(join(dir, file), filter, files);
        else if (!filter)
            files.push(join(dir, file));
        else if (filter.includes(extname(file)))
            files.push(join(dir, file));
    });
    return files;
}
