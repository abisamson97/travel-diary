const fs = require('fs');
const path = require('path');
const exclusions = ['.git', 'node_modules', 'map.js', 'package.json', 'package-lock.json', 'project-structure.txt'];

let lineCounter = 0;

function writeToFile(filepath, content) {
    fs.appendFileSync('project-structure.txt', `${++lineCounter}: ${filepath}\n`);
    if (content) {
        const lines = content.split('\n');
        for (const line of lines) {
            fs.appendFileSync('project-structure.txt', `  ${++lineCounter}: ${line}\n`);
        }
    }
}

function traverseDirectory(directoryPath) {
    const items = fs.readdirSync(directoryPath);
    
    for (const item of items) {
        const itemPath = path.join(directoryPath, item);

        if (exclusions.includes(item)) {
            continue;
        }

        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            writeToFile(itemPath, ''); // Write directory entry
            traverseDirectory(itemPath); // Recursively traverse subdirectories
        } else if (stats.isFile()) {
            const fileContent = fs.readFileSync(itemPath, 'utf-8');
            writeToFile(itemPath, fileContent); // Write file entry with content
        }
    }
}

// Clear the existing project-structure.txt file if it exists
if (fs.existsSync('project-structure.txt')) {
    fs.unlinkSync('project-structure.txt');
}

// Start traversing from the directory where map.js is located
writeToFile('.', ''); // Write root directory entry
traverseDirectory('./'); // Start traversal

console.log('Directory mapping completed. Check project-structure.txt.');