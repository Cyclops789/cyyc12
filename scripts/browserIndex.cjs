const fs = require('fs');
const path = require('path');

const allowedFolders = [
    {
        name: "desktop",
        files: []
    },
    {
        name: "music",
        files: []
    },
    {
        name: "pictures",
        files: []
    },
    {
        name: "videos",
        files: []
    },
    {
        name: "documents",
        files: []
    }
];

try {
    allowedFolders.forEach((allowedFolder) => {
        const files = fs.readdirSync(
            `${__dirname}/../public/static/${allowedFolder.name}`,
            {
                withFileTypes: true,
            }
        );

        allowedFolder.files = files.map((file) => ({
            name: file.name,
            size: Math.round(fs.readFileSync(`${file.parentPath}/${file.name}`).byteLength / (1024 * 1024)).toFixed(2),
            staticPath: `/static/${allowedFolder.name}/${file.name}`,
            type: file.isFile() ? 'file' : 'folder',
            ext: path.extname(`${file.parentPath}/${file.name}`),
        }));
    });
} finally {
    fs.writeFileSync(`${__dirname}/../src/assets/json/browser.json`, JSON.stringify(allowedFolders));
}