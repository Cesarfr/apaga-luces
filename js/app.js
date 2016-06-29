$(document).ready(function () {
    var popup = new Foundation.Reveal($('#initModal'));
    var popInst = new Foundation.Reveal($('#insModal'));
    
    $("#inicio").click(function () {
        popup.open();
    });
    
    $("#inst").click(function () {
        popInst.open();
    });

    $("#start").click(function () {
        popup.close();
        $("#centro").addClass("hide");
        $("#tablero").removeClass("hide");
    });
    
    $("#ok").click(function () {
        popInst.close();
    });
});