define([], function() {
    /****** Data Structure ******/
    /**
     * Represents a single field.
     */
    function generateFieldData(x, y) {
        return {
            x: x,
            y: y,
            letter: ' ',
            bgColor: '#000',
            fgColor: '#FFF'
        };
    }

    /**
     * Represents the whole data of a terminal.
     */
    function generateTerminalData(obj) {
        var width = obj.width,
            height = obj.height,
            data = {};
        data.width = width;
        data.height = height;
        data.field = Array(width * height);
        for (i = 0; i < data.field.length; i++) {
            data.field[i] = generateFieldData(
                i % width, i / width
            );
        }
        _.extend(data, Backbone.Events);
        return data;
    }


    /***** Views *****/
    function setFieldForRow($field, data) {
        $field.css({'background-color': data.bgColor,
                    'color': data.fgColor});
        $field.text(data.letter);
    }

    function generateTableView(data) {
        var $view = $('<table>'),
            width = data.width;
        for (y = 0; y < data.height; y++) {
            var $row = $('<tr>');
            for (x = 0; x < data.width; x++) {
                var $field = $('<td>');
                setFieldForRow($field, data.field[y * width + x]);
                $field.appendTo($row);
            }
            $row.appendTo($view);
        }        
        $view.addClass('btfield');
        return $view;
    }

    /**
     * Visualizes the data
     */
    function generateTerminalView(data) {
        var $view = generateTableView(data);
        return {
            '$view': $view
        };
    }

    function generateNewTerminal(obj) {
        var data = generateTerminalData(obj),
            view = generateTerminalView(data);
        return view;
    }

    return {
        'generateTerminalData': generateTerminalData,
        'generateTerminalView': generateTerminalView,
        'generateNewTerminal': generateNewTerminal
    };
});