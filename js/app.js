$(document).ready(function () {
    var popStart = new Foundation.Reveal($('#initModal'));
    var popInst = new Foundation.Reveal($('#insModal'));
    var popEnd = new Foundation.Reveal($('#endGame'));
    var sound = document.getElementById("sound");
    var au = document.getElementById("audioInst");
    var canvas, ctx, jsTimer, game, val;
    var time = 0;
    var measureTime = 0;
    
    $(window).bind("load", function () {
        var footer = $("#footer");
        var pos = footer.position();
        var height = $(window).height();
        height = height - pos.top;
        height = height - footer.height();
        if (height > 0) {
            footer.css({
                'margin-top': height + 'px'
            });
        }
    });
    
    $("#inicio").click(function () {
        popStart.open();
    });
    
    $("#reload").click(function () {
        location.reload();
    });
    
    $("#btnEnd").click(function () {
        $("#reload").removeClass("hide");
    });
    
    $("#inst").click(function () {
        popInst.open();
    });
    
    $("#restart").click(function () {
        popEnd.close();
        $("#click").html(0);
        canvas.addEventListener("click", clickHandler);
        ctx.fillStyle = "#A0A0A0";
        ctx.strokeStyle = "#FFFFFF";
        game = new ApagaLuces(parseInt(val));
    });
    
    $("#otroTab").click(function () {
        $("#click").html(0);
        popEnd.close();
        popStart.open();
    });

    $("#start").click(function () {
        popStart.close();
        canvas = document.getElementById("board");
        ctx = canvas.getContext("2d");
        canvas.addEventListener("click", clickHandler);
        ctx.fillStyle = "#A0A0A0";
        ctx.strokeStyle = "#FFFFFF";
        val = $("#opciones").val();
        $("#centro").addClass("hide");
        $("#tablero").removeClass("hide");
        game = new ApagaLuces(parseInt(val));
    });
    
    $("#ok").click(function () {
        popInst.close();
		$("#imgFoco").attr('src', 'src/img.png');
    });
    
    $("#pinst").click(function () {
        $("#imgFoco").attr('src', 'src/foco.gif');
		au.play();
		au.addEventListener("ended", function() {
            au.currentTime = 0;
            $("#imgFoco").attr('src', 'src/static.gif');
        });
    });
    
    
    function cell(x, y) {
        this.x = x;
        this.y = y;
    }
    
    function ApagaLuces(w) {
        this.board = [];
        this.width = w;
        this.height = w;
        this.cellSize = canvas.width/w;

        this.moveCount = 0;

        this.init = function () {
            for (var y = 0; y < this.height; y++) {
                var row = [];
                for (var x = 0; x < this.width; x++) {
                    if (Math.random() < .4) {
                        row.push(true);
                    } else {
                        row.push(false);
                    }
                }
                this.board.push(row);
            }
            this.drawBoard();
        }
        this.init();
        measureTime = 1;
        time = -1;
        startTimer();
        window.clearInterval(jsTimer);
        jsTimer = self.setInterval(startTimer, 1000);
    }
    
    ApagaLuces.prototype.drawBoard = function () {
        for (var y = 0; y < this.board.length; y++) {
            for (var x = 0; x < this.board[y].length; x++) {
                if (this.board[x][y] == true) {
                    ctx.fillStyle = "#A0A0A0";
                } else {
                    ctx.fillStyle = "#000000";
                }
                ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize); 
            }
        }
    }
    
    function startTimer() {
        if (measureTime == 1) {
            time = time + 1;
            var timer = document.getElementById("time");
            timer.innerHTML = time;
        }
    }
    
    function clickHandler (event) {
        x = Math.floor((event.clientX - canvas.offsetLeft) / game.cellSize);
        y = Math.floor((event.clientY - canvas.offsetTop) / game.cellSize);
        game.moveCount++;
        $("#click").html(game.moveCount);
        game.flipCells(game.getNeighbors(x, y));
        game.drawBoard();
        game.checkWinCondition();
    }
    
    ApagaLuces.prototype.flipCells = function (cells) {
        for (var i = 0; i < cells.length; i++) {
            var x = cells[i].x;
            var y = cells[i].y;
            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                this.board[x][y] = !this.board[x][y];
            }
        }
    }

    ApagaLuces.prototype.getNeighbors = function (x, y) {
        var cells = [];
        cells.push(new cell(x, y));
        cells.push(new cell(x + 1, y));
        cells.push(new cell(x - 1, y));
        cells.push(new cell(x, y + 1));
        cells.push(new cell(x, y - 1));

        return cells;
    }

    ApagaLuces.prototype.checkWinCondition = function () {
        for (var y = 0; y < this.board.length; y++) {
            for (var x = 0; x < this.board[y].length; x++) {
                if (this.board[x][y] == true) {
                    return;
                 }
            }
        }
        $("#endTime").html(time);
        $("#endClicks").html(this.moveCount);
        sound.play();
        popEnd.open();
        canvas.removeEventListener("click", clickHandler);
        measureTime = 0;
    }
    
});