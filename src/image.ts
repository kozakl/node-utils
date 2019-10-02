import {basename, extname, join} from 'path';
import {existsSync, mkdirpSync} from 'fs-extra';
import gm from 'gm';

export function imageSize(image:string) {
    return new Promise((resolve, reject)=> {
        gm(image)
            .size((error, value)=> {
                return !error ? resolve(value) :
                                reject(error)
        });
    });
}

export function makeImageSet(image:ImageSet)
{
    if (!existsSync(image.dest)) {
        mkdirpSync(image.dest);
    }
    
    image.sizes.forEach((size)=> {
        const imageName = basename(image.src, extname(image.src));
        if (image.destDir)
            mkdirpSync(join(image.dest, imageName));
        
        const dest = join(
            image.dest,
            image.destDir ? imageName : '' ,
            (size.name || imageName) +
            (size.suffix || '') +
            (image.format || extname(image.src))
        );
        gm(image.src)
            .noProfile()
            .resize(size.value)
            .blur(size.blur && size.blur[0] || 0,
                  size.blur && size.blur[1])
            .quality(size.quality || image.quality)
            .write(dest, (error)=>
                error && console.log(error));
    });
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
        blur:number[];
    }[]
}
