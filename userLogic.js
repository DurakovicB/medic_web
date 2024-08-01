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
                    window.location.href='/medic_web/home.html'

                } else {
                    alert(response.message);
                }
            },
            error: function(xhr) {
                }
        });
    },
}

function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => console.error('Error loading content:', error));
}

function login() {
    loadContent('login.html');
}

function home() {
    loadContent('home.html');
}

page('/', login);
page('/home', home);

page.start();