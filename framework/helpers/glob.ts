import globStream = require('glob-stream');

export default function glob(glob: string | string[], options: globStream.Options, callback: (file: globStream.Entry) => Promise<void>): Promise<void> {
    return new Promise<void[]>((resolve, reject) => {
        const handles: Array<Promise<void>> = [];

        globStream(glob, options)
            .on('data', (file: globStream.Entry) => handles.push(callback(file)))
            .on('error', reject)
            .on('end', () => resolve(Promise.all(handles)));
        ;
    }).then(ret => void ret);
}
