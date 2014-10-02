(function () {

    var log_status = function (msg) {
    
        $('#status').html(msg).removeClass('error');

    };

    var log_error_status = function (msg) {

        $('#status').html(msg).addClass('error');
    
    };

    var log = function (id, message) {
    
        var root    = $(id + ' .log'),
            msg     = $('<span></span>').html(message);

        root.append(msg, $('<br/>'));
    
    };

    var log_clear = function (id) {
    
        $(id + ' .log').empty();
    
    };

    var log_error = function (id, message) {
    
        var root = $(id + ' .log'),
            msg = $('<span style="color:red;"></span>').html(message);

        root.append(msg, $('<br />'));
    
    };


    var client  = new ModbusClient();

    $('#console').hide();

    client.on('connected', function () {

        $('#connect').hide();
        $('#console').show();

        log_status('Connection established.');

    });

    client.on('disconnected', function () {
   
        $('#connect').show();
        $('#console').hide();

        log_status('Connection closed.');

    });

    client.on('connection_error', function () {
    
        log_error_status('Connection error.');
    
    });

    client.on('error', function () {
    
        log_error_status('Connection error.');

        setTimeout(function () {
           
            log_status('Reconnecting...');

            client.reconnect();
            
        }, 5000);
    
    });

    $('#connect_button').on('click', function () {
    
        var host = $('#host').val(),
            port = parseInt($('#port').val());

        client.connect(host, port);
    
    });

    $('#disconnect_button').on('click', function () {
    
        client.disconnect();
    
    });

    $('#executeReadCoilsButton').on('click', function () {
    
    
    });

    $('#executeReadCoilsButton').on('click', function () {
   
        var start = parseInt($('#readCoilsStart').val()),
            count = parseInt($('#readCoilsCount').val());

        log_clear('#read_coils');

        log('#read_coils', 'Executing with start = ' + start + ' and count = ' + count);

        console.log('Executing ReadCoils', start, count);

        client.readCoils(start, count).then(function (data, req) {
        
            log('#read_coils', 'Request successfull.');

            for (var i = 0; i < data.length; i += 1) {
            
                log('#read_coils', '#' + ( i + req.start ) + ' - ' + data[i]);

            }
        
        }).fail(function (err) {
        
            log_error('#read_coils', 'Request failed (' + err.errCode +').');

        });

    });


    $('#executeReadHoldingRegistersButton').on('click', function () {
   
        var start = parseInt($('#readHoldingRegistersStart').val()),
            count = parseInt($('#readHoldingRegistersCount').val());

        log_clear('#read_holding_registers');

        log('#read_holding_registers', 'Executing with start = ' + start + ' and count = ' + count);

        console.log('Executing ReadHoldingRegisters', start, count);

        client.readHoldingRegisters(start, count).then(function (data, req) {
        
            log('#read_holding_registers', 'Request successfull.');

            for (var i = 0; i < data.length; i += 1) {
            
                log('#read_holding_registers', '#' + ( i + req.start ) + ' - ' + data[i]);

            }
        
        }).fail(function (err) {
        
            log_error('#read_holding_registers', 'Request failed (' + err.errCode +').');

        });

    });


    $('#executeReadInputRegistersButton').on('click', function () {
   
        var start = parseInt($('#readInputRegistersStart').val()),
            count = parseInt($('#readInputRegistersCount').val());

        log_clear('#read_input_registers');

        log('#read_input_registers', 'Executing with start = ' + start + ' and count = ' + count);

        console.log('Executing ReadInputRegisters', start, count);

        client.readInputRegisters(start, count).then(function (data, req) {
        
            log('#read_input_registers', 'Request successfull.');

            for (var i = 0; i < data.length; i += 1) {
            
                log('#read_input_registers', '#' + ( i + req.start ) + ' - ' + data[i]);

            }
        
        }).fail(function (err) {
        
            log_error('#read_input_registers', 'Request failed (' + err.errCode +').');

        });

    });

    $('#executeWriteSingleCoilButton').on('click', function () {
   
        var address = parseInt($('#writeSingleCoilAddress').val()),
            value   = parseInt($('#writeSingleCoilValue').val());

        log_clear('#write_single_coil');

        log('#write_single_coil', 'Executing WriteSingleCoil (' + address + ', ' + value + ')'); 

        client.writeSingleCoil(address, value).then(function () {
        
            log('#write_single_coil', 'Request successfull.');
        
        }).fail(function (err) {
        
            log_error('#write_single_coil', 'Request failed (' + err.errCode + ').');

        });
    
    });


    $('#executeWriteSingleRegisterButton').on('click', function () {
   
        var address = parseInt($('#writeSingleRegisterAddress').val()),
            value   = parseInt($('#writeSingleRegisterValue').val());

        log_clear('#write_single_register');

        log('#write_single_register', 'Executing WriteSingleRegister (' + address + ', ' + value + ')'); 

        client.writeSingleRegister(address, value).then(function () {
        
            log('#write_single_register', 'Request successfull.');
        
        }).fail(function (err) {
        
            log_error('#write_single_register', 'Request failed (' + err.errCode + ').');

        });
    
    });

    var show = function (id) {
        $('.subpage').hide();
        $(id).show();
    }

    show('#read_coils');

    $('#toggle_fc01').on('click', function () {
        show('#read_coils');
    });

    $('#toggle_fc03').on('click', function () {
        show('#read_holding_registers');
    });

    $('#toggle_fc04').on('click', function () {
        show('#read_input_registers');
    });

    $('#toggle_fc05').on('click', function () {
        show('#write_single_coil');
    });

    $('#toggle_fc06').on('click', function () {
        show('#write_single_register');
    });

})();
