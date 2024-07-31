var userLogic = {
    login: function() {
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: 'http://localhost/medic_api/login',
            type: 'POST',
            data: {
                username: username,
                password: md5(password)
            },
            success: function(response) {
                if (response.status == 'success') {

                } else {
                    alert(response.message);
                }
            },
            error: function(xhr) {
                }
        });
    },
}