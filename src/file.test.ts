import {mkdirpSync, removeSync,
        writeFileSync} from 'fs-extra';
import {listFiles} from './file';

test('listFiles', ()=> {
    removeSync('/tmp/listFiles');
    mkdirpSync('/tmp/listFiles/a');
    writeFileSync('/tmp/listFiles/a/1.txt', '');
    writeFileSync('/tmp/listFiles/a/2.dat', '');
    writeFileSync('/tmp/listFiles/a/3.dat', '');
    mkdirpSync('/tmp/listFiles/b');
    writeFileSync('/tmp/listFiles/b/1.txt', '');
    writeFileSync('/tmp/listFiles/b/2.dat', '');
    
    expect(listFiles('/tmp/listFiles'))
        .toEqual(expect.arrayContaining([
            '/tmp/listFiles/a/1.txt',
            '/tmp/listFiles/a/2.dat',
            '/tmp/listFiles/a/3.dat',
            '/tmp/listFiles/b/1.txt',
            '/tmp/listFiles/b/2.dat'
        ]));
    expect(listFiles('/tmp/listFiles', ['.dat', '.txt']))
        .toEqual(expect.arrayContaining([
            '/tmp/listFiles/a/1.txt',
            '/tmp/listFiles/a/2.dat',
            '/tmp/listFiles/a/3.dat',
            '/tmp/listFiles/b/1.txt',
            '/tmp/listFiles/b/2.dat'
        ]));
    expect(listFiles('/tmp/listFiles', ['.dat']))
        .toEqual(expect.arrayContaining([
            '/tmp/listFiles/a/2.dat',
            '/tmp/listFiles/a/3.dat'
        ]));
});
