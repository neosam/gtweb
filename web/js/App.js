define(['terminal'], function(terminal) {
    return function() {
        var terminalView = terminal.generateNewTerminal({
            width: 80,
            height: 23
        });
        $('.game').append(terminalView.$view);
    };
});