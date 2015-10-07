var gridSize = 100;
var pixelSize = 5;
var colorLive = "red";
var colorDead = "white";
var iterations = 0;

function drawSquare(ctxt, x, y, live) {
	live ? color = colorLive : color = colorDead;

	ctxt.beginPath();
	ctxt.rect(x, y, pixelSize, pixelSize);
	ctxt.fillStyle = color;
	ctxt.fill();
}

function createGrid() {
	var grid = new Array();
	var row;

	for (var i = 0; i < gridSize; i++) {
		row = new Array();
		for (var j = 0; j < gridSize; j++) {
			row[j] = 0;
		}
		grid[i] = row;
	}
	return grid;
}

function drawGrid(ctxt, grid) {
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			if (grid[i][j]) {
				drawSquare(ctxt, i*pixelSize, j*pixelSize, true);
			}
			else {
				drawSquare(ctxt, i*pixelSize, j*pixelSize, false);
			}
		}
	}
}

function isAlive(grid, x, y) {
	if (x < 0 || x > gridSize-1 || y < 0 || y > gridSize-1) {
		return 0;
	}
	return grid[x][y];
}

function numNeighbors(grid, i, j) {
	var n1 = isAlive(grid, i-1, j-1);
	var n2 = isAlive(grid, i-1, j);
	var n3 = isAlive(grid, i-1, j+1);
	var n4 = isAlive(grid, i,   j-1);
	var n5 = isAlive(grid, i,   j+1);
	var n6 = isAlive(grid, i+1, j-1);
	var n7 = isAlive(grid, i+1, j);
	var n8 = isAlive(grid, i+1, j+1);

	return n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8;
}

function iterateLife(grid) {
	var tmpGrid = createGrid();
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			var total = numNeighbors(grid, i, j);

			if(grid[i][j]) {
				if(total < 2 || total > 3) {
					tmpGrid[i][j] = 0;
				}
				else {
					tmpGrid[i][j] = 1;
				}
			}
			else {
				if(total == 3) {
					tmpGrid[i][j] = 1;
				}
				else {
					tmpGrid[i][j] = 0;
				}
			}
		}
	}
	iterations++;
	return tmpGrid;
}

function updateStatus(eID) {
	var totalAlive = 0;
	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			if(grid[i][j]) {
				totalAlive++;
			}
		}
	}
	document.getElementById(eID).firstChild.nodeValue = "Iteration: " + iterations + ", Alive: " + totalAlive;
}