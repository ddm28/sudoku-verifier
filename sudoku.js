var fs = require('fs');

var NONET_DIM = 3;
var MATRIX_DIM = 9;
var VALID_SUM = 45;
var TOTAL_ELEMENTS = 81;

function verifySudoku(filename) {
	fs.readFile(filename, 'utf8', function (err, data) {
		if (err) throw err;

		console.log('OK: ' + filename);

		var sudokuArr = data
			.replace(/\D/g, '')
			.split('')
			.map((item) => parseInt(item));

		if (sudokuArr.length === TOTAL_ELEMENTS) {
			if (isValidSudoku(sudokuArr)) {
				console.log('Valid Sudoku');
				return true;
			} else {
				console.log('Invalid Sudoku');
				return false;
			}
		} else {
			console.log('Invalid Sudoku Input');
			return false;
		}
	});
}

function coordinates(index) {
	var row = Math.floor(index / MATRIX_DIM);
	var col = index % MATRIX_DIM;
	var nonetRow = Math.floor(row / NONET_DIM);
	var nonetCol = Math.floor(col / NONET_DIM);

	return {
		row: row,
		col: col,
		nonetRow: nonetRow,
		nonetCol: nonetCol
	};
};

function isValidSudoku(sudokuArr) {
	return verifyFiltered(filterSum(sumValues(sudokuArr)));
};

function sumValues(sudokuArr) {
	var rowSum = [];
	var colSum = [];
	var nonetSum = [];

	sudokuArr.map((item, index) => {
		var coords = coordinates(index);

		rowSum[coords.row] ? (rowSum[coords.row] += sudokuArr[index]) : (rowSum[coords.row] = sudokuArr[index]);
		colSum[coords.col] ? (colSum[coords.col] += sudokuArr[index]) : (colSum[coords.col] = sudokuArr[index]);
		nonetSum[coords.nonetRow] ? undefined : nonetSum[coords.nonetRow] = [];
		nonetSum[coords.nonetRow][coords.nonetCol] ? (nonetSum[coords.nonetRow][coords.nonetCol] += sudokuArr[index]) : (nonetSum[coords.nonetRow][coords.nonetCol] = sudokuArr[index]);
	});

	return {
		rowSum: rowSum,
		colSum: colSum,
		nonetSum: nonetSum
	}
}

function filterSum(sumArrays) {
	return {
		rowFiltered: sumArrays.rowSum.filter(item => item !== VALID_SUM),
		colFiltered: sumArrays.colSum.filter(item => item !== VALID_SUM),
		nonetFiltered: sumArrays.nonetSum.filter(nonetRow => {
			nonetRowFiltered = nonetRow.filter(item => item !== VALID_SUM);

			return nonetRowFiltered.length > 0;
		})
	};
}

function verifyFiltered(filteredSums) {
	return !filteredSums.rowFiltered.length &&
		!filteredSums.colFiltered.length &&
		!filteredSums.nonetFiltered.length;
}

module.exports = {
	coordinates: coordinates,
	sumValues: sumValues,
	filterSum: filterSum,
	isValidSudoku: isValidSudoku,
	verifyFiltered: verifyFiltered,
	verifySudoku: verifySudoku
};