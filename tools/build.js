const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const mkdirp = require('mkdirp');

let type = process.argv[2] == 'desktop' ? 'desktop' : 'server';
const sourcesFolder = path.normalize('./app/' + type);
const files = getFilesList(sourcesFolder);

files.forEach(function (file) {
  const fileName = path.basename(file);

  const destinationPath = path.resolve(path.dirname(file).replace(/app/, 'build'));
  !fs.existsSync(destinationPath) && mkdirp.sync(destinationPath);

  if (path.extname(file) === '.js') {
    const { code } = babel.transformFileSync(file);
    fs.writeFileSync(path.join(destinationPath, fileName), code);
  } else {
    fs.writeFileSync(path.join(destinationPath, fileName), fs.readFileSync(file));
  }

});

function getFilesList(dir, filelist = []) {
  const files = fs.readdirSync(dir);

  files.forEach(function(file) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      getFilesList(filePath, filelist);
    } else {
      filelist.push(filePath);
    }
  });

  return filelist;
};
