import {basename, extname, join} from 'path';
import {existsSync, mkdirpSync} from 'fs-extra';
const gm = require('gm').subClass({imageMagick: true});

export function imageSize(image:string) {
    return new Promise((resolve, reject)=> {
        gm(image)
            .size((error, value)=> {
                return !error ? resolve(value) :
                                reject(error)
        });
    });
}

export async function makeImageSet(image:ImageSet, debug = false)
{
    if (!existsSync(image.dest)) {
        mkdirpSync(image.dest);
    }
    
    console.log(image.src);
    await image.sizes.reduce(async (promise, size)=> {
        await promise;
        await new Promise((resolve, reject)=> {
            const name = basename(image.src, extname(image.src));
            const dest = join(
                image.dest,
                image.destDir ? name : '' ,
                (size.name || name) +
                (size.suffix || '') +
                (image.format || extname(image.src))
            );
            if (image.destDir) {
                mkdirpSync(join(image.dest, name));
            }
            if (!debug) {
                gm(image.src)
                    .noProfile()
                    .resize(size.value)
                    .blur(0, size.blur || 0.001)
                    .quality(size.quality || image.quality)
                    .write(dest, (error)=>
                        !error ? resolve() :
                                 reject(error));
            } else {
                gm(image.src)
                    .noProfile()
                    .resize(size.value)
                    .blur(0, size.blur || 0.001)
                    .quality(size.quality || image.quality)
                    .fill('#FFFFFF')
                    .font('Helvetica', 0.1 * size.value)
                    .drawText(
                        0.4 * size.value,
                        0.11 * size.value,
                        size.name
                    )
                    .write(dest, (error)=>
                        !error ? resolve() :
                                 reject(error));
            }
        });
    }, Promise.resolve());
}

interface ImageSet {
    src:string;
    dest:string;
    destDir:boolean;
    format:string;
    quality:number;
    sizes: {
        value:number;
        name:string;
        suffix:string;
        quality:number;
        blur:number;
    }[]
}
