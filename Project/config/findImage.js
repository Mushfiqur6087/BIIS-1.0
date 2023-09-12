const fs = require('fs');
const path = require('path');

function findPhotoById(id) {
    const imgFolderPath = path.join(__dirname,"..","public","img"); // Adjust the folder path as needed
    const files = fs.readdirSync(imgFolderPath);

    for (const file of files) {
        if (file.includes(id + '.')) {
            return path.join('/img', file); // Return the path to the matching file
        }
    }

    return path.join('/img','DEFAULT.jpg'); // Return null if no matching file is found
}


module.exports={findPhotoById};