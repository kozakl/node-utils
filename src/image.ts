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
