// To Run Test: ./node_modules/.bin/jest sudoku.test.js

const sudoku = require('./sudoku');

describe('coordinate', () => {
	test('get correct coordinates', () => {
		expect(sudoku.coordinates(80)).toEqual({
			row: 8,
			col: 8,
			nonetRow: 2,
			nonetCol: 2
		});
	});

	test('get correct coordinates', () => {
		expect(sudoku.coordinates(29)).toEqual({
			row: 3,
			col: 2,
			nonetRow: 1,
			nonetCol: 0
		});
	});

	test('get correct coordinates', () => {
		expect(sudoku.coordinates(0)).toEqual({
			row: 0,
			col: 0,
			nonetRow: 0,
			nonetCol: 0
		});
	});
});

describe('sumValues', () => {
	var validSudoku = [8, 6, 4, 3, 7, 1, 2, 5, 9, 3, 2, 5, 8, 4, 9, 7, 6, 1, 9, 7, 1, 2, 6, 5, 8, 4, 3, 4, 3, 6, 1, 9, 2, 5, 8, 7, 1, 9, 8, 6, 5, 7, 4, 3, 2, 2, 5, 7, 4, 8, 3, 9, 1, 6, 6, 8, 9, 7, 3, 4, 1, 2, 5, 7, 1, 3, 5, 2, 8, 6, 9, 4, 5, 4, 2, 9, 1, 6, 3, 7, 8];

	test('sum', () => {
		var res = sudoku.sumValues(validSudoku);

		expect(res).toEqual({
			"colSum": [45, 45, 45, 45, 45, 45, 45, 45, 45],
			"nonetSum": [
				[45, 45, 45],
				[45, 45, 45],
				[45, 45, 45]
			],
			"rowSum": [45, 45, 45, 45, 45, 45, 45, 45, 45]
		});
	})
});

describe('filterSum', () => {
	var validSumArray = {
		"colSum": [45, 45, 45, 45, 45, 45, 45, 45, 45],
		"nonetSum": [
			[45, 45, 45],
			[45, 45, 45],
			[45, 45, 45]
		],
		"rowSum": [45, 45, 45, 45, 45, 45, 45, 45, 45]
	};

	test('filterSum', () => {
		var res = sudoku.filterSum(validSumArray);

		expect(res).toEqual({
			"colFiltered": [],
			"nonetFiltered": [],
			"rowFiltered": []
		});
	})
});

describe('verifyFiltered', () => {
	var validFiltered = {
		"colFiltered": [],
		"nonetFiltered": [],
		"rowFiltered": []
	};
	var invalidFiltered = {
		"colFiltered": [1, 2],
		"nonetFiltered": [],
		"rowFiltered": []
	}

	test('verifyFiltered true', () => {
		var res = sudoku.verifyFiltered(validFiltered);

		expect(res).toBe(true);
	});

	test('verifyFiltered false', () => {
		var res = sudoku.verifyFiltered(invalidFiltered);

		expect(res).toBe(false);
	})
});

describe('isValidSudoku', () => {
	var validSudoku = [8, 6, 4, 3, 7, 1, 2, 5, 9, 3, 2, 5, 8, 4, 9, 7, 6, 1, 9, 7, 1, 2, 6, 5, 8, 4, 3, 4, 3, 6, 1, 9, 2, 5, 8, 7, 1, 9, 8, 6, 5, 7, 4, 3, 2, 2, 5, 7, 4, 8, 3, 9, 1, 6, 6, 8, 9, 7, 3, 4, 1, 2, 5, 7, 1, 3, 5, 2, 8, 6, 9, 4, 5, 4, 2, 9, 1, 6, 3, 7, 8];
	var invalidSudoku = [9, 6, 4, 3, 7, 1, 2, 5, 9, 3, 2, 5, 8, 4, 9, 7, 6, 1, 9, 7, 1, 2, 6, 5, 8, 4, 3, 4, 3, 6, 1, 9, 2, 5, 8, 7, 1, 9, 8, 6, 5, 7, 4, 3, 2, 2, 5, 7, 4, 8, 3, 9, 1, 6, 6, 8, 9, 7, 3, 4, 1, 2, 5, 7, 1, 3, 5, 2, 8, 6, 9, 4, 5, 4, 2, 9, 1, 6, 3, 7, 8];


	test('test isValidSudoku for valid sudoku board', () => {
		var res = sudoku.isValidSudoku(validSudoku);

		expect(res).toBe(true);
	});

	test('test isValidSudoku for invalid sudoku board', () => {
		var res = sudoku.isValidSudoku(invalidSudoku);

		expect(res).toBe(false);
	})
});