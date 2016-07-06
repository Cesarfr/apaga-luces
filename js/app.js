$(document).ready(function () {
    var popup = new Foundation.Reveal($('#initModal'));
    var popInst = new Foundation.Reveal($('#insModal'));
    var ctx = null;
    var canvas = null;
    var time = 0;
    var measureTime = 0;
    var jsTimer;
    
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
        popup.open();
    });
    
    $("#inst").click(function () {
        popInst.open();
    });

    $("#start").click(function () {
        popup.close();
        canvas = document.getElementById("board");
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "#A0A0A0";
        ctx.strokeStyle = "#FFFFFF";
        var val = $("#opciones").val();
        $("#centro").addClass("hide");
        $("#tablero").removeClass("hide");
        var gb = new ApagaLuces(parseInt(val));
    });
    
    $("#ok").click(function () {
        popInst.close();
    });
    
    
    function ApagaLuces(w) {
        this.board = [];
        this.width = w;
        this.height = w;
        this.cellSize = canvas.width/w;

        this.moveCount = 0;

        //  seed board with random on/off values
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
});