require.config({
    paths: config.modulePaths,
});

require.config({
    paths: { "ext": "/js/modules/ext-4.2" },
    shim: { 'ext': { exports: 'Ext' } }
});


define(function (require) {
    var $ = require('jquery');

    $(function (){
        $("#pwd").keyup(function (e) {
            var key = e.which;
            if (key == 13) {
                event.returnValue = false;
                event.cancel = true;
                $('.loginbtn').click();
            }
        });

        $('#reset').click(function () {
            $('.loginuser').val('');
            $('.loginpwd').val('');
        })

        $('#sublogin').click(function () {
            var data = $('form').serialize();
            if ($("#loginerror").css("visibility") == "visible") {
                $("#loginerror").css("visibility", "hidden");
            }
            $('#loading-center-absolute').show();
            $.ajax({
            	url: '/api/Login/Login',
            	type: 'post',
            	data: data,
            	dataType: 'json',
            	success: function (data) {
            	    $('#loading-center-absolute').hide();

            	    if (!data || data.Errors || typeof data.Total == "undefined") {
            	        if ($("#loginerror").css("visibility") == "hidden") {
            	            $("#loginerror").css("visibility", "visible");
            	        }
            	        return;
            	    } else
            	        if (data.Success) {
            	            window.location = 'home.html';
            	            if ($("#loginerror").css("visibility") == "visible") {
            	                $("#loginerror").css("visibility", "hidden");
            	            }
            	        }
            	},
            	error: function (jqXhr, textStatus, errorThrown) {
            	    $("#loginbox").css("visibility", "visible");
            	    $('#loading-center-absolute').hide();
            	}
            });
        });
    })
})