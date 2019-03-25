var sudoku = require('./sudoku');

var filename = process.argv[2];

if (process.argv.length !== 3) {
    console.log('Usage: node ' + process.argv[1] + ' Invalid input.\nPlease provide file name\nexample: node sudoku.js testfile.txt');
    process.exit(1);
}

return sudoku.verifySudoku(filename);