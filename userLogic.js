var userLogic = {

        
  
    init:function(){
        userLogic.populateDashboard();
    },

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

    populateDashboard: function() {
        $.ajax({
            url: '/medic_api/users',
            type: 'GET',
            success: function(response) {
                var userTableBody = $('#userTableBody');
                userTableBody.empty();
                response.forEach(function(user) {
                    var row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>
                            <button class="btn btn-info btn-sm" onclick="userLogic.showEditUserModal(${user.id})">Show Info</button>
                        </td>
                    </tr>`;
                    userTableBody.append(row);
                });
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log('AJAX error: ' + textStatus + ' : ' + errorThrown);
            }
        });
    },

    block: function(id) {
        if (confirm('Are you sure?') == true) {
          $.ajax({
            url: '/medic_api/users/block/' + id,
            type: 'POST',
            beforeSend: function(xhr){},
            success: function(result) {
              UserService.populateDashboard();
            }
          });
        }
      },

      showEditUserModal: function showEditUserModal(id) {
        $.ajax({
                url: '/medic_api/users/details/' + id,
                type: 'GET',
                contentType: "application/json",
                dataType: "json",
                beforeSend: function(xhr){
                },
                success: function(data) {
                    $("#id").val(data.id);
                    $("#name").val(data.name);
                    $("#username").val(data.username);
                    $("#orders").val(data.orders);
                    $("#last_login_date").val(data.last_login_date);
                    $("#image").val(data.image);
                    $("#date_of_birth").val(data.date_of_birth);


                $("#editUserModal").modal("show");
                }});
      }
}

$(document).ready(function() {
    userLogic.populateDashboard();
  });


