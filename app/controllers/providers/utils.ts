const fs: any = require('fs');
const mime: any = require('mime');

export const uploadLocalFile = async (file: any) => {
  let data = new Promise((resolve: Function, reject: Function) => {
    fs.open(`temp/${file.name}`, 'w', function (err: any, fd: any) {
      if (err) {
        reject('could not open file: ' + err);
      }

      // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
      fs.write(fd, file.data, 0, file.data.length, null, function (err: any) {
        if (err) reject('could not open file: ' + err);
        fs.close(fd, function () {
          console.log('wrote the file successfully');
          resolve();
        });
      });
    });
  })
  return await data;
}
export const deleteLocal = (file: string) => {
  fs.unlinkSync(`temp/${file}`)
}
export const getDataLocal = (file: string) => {
  return fs.readFileSync(`temp/${file}`);
}
export const getMime = (file: string) => {
  return mime.getType(`temp/${file}`)
}