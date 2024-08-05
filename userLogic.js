var userLogic = {

        
  
    init:function(){
        $('#addUserForm').validate({
            submitHandler: function(form) {
              var user = Object.fromEntries((new FormData(form)).entries());
              console.log(user);
              userLogic.add(user);
            }
          });

        userLogic.populateDashboard();
    },

    login: async function(user) {
        var username = $("#username").val();
        var password = $("#password").val();
        await spinLoaderForTwoSeconds();

        $.ajax({
            url: 'https://lobster-app-7g7zh.ondigitalocean.app/login',
            type: 'POST',
            data: {
                username: username,
                password: md5(password)
            },
            success:  function(response) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("username", response.username);

                window.location.href='https://lobster-app-7g7zh.ondigitalocean.app/home.html';
            },
            error: function (xhr, tst, err) {
                alert(JSON.parse(xhr.responseText)["message"]);
            },
        });
    },

    populateDashboard: function() {
        $.ajax({
            url: 'https://lobster-app-7g7zh.ondigitalocean.app//users',
            type: 'GET',
            success: function(response) {
                var userTableBody = $('#userTableBody');
                userTableBody.empty();
                response.forEach(function(user) {
                    var row = `<tr class="clickable-row" onclick="userLogic.showEditUserModal(${user.id})">
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.last_login_date}</td>
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
            url: 'https://lobster-app-7g7zh.ondigitalocean.app/users/block/' + id,
            type: 'POST',
            beforeSend: function(xhr){},
            success: function(result) {
              userLogic.populateDashboard();
            }
          });
        }
      },

      showEditUserModal: function showEditUserModal(id) {
        $.ajax({
                url: 'https://lobster-app-7g7zh.ondigitalocean.app/users/details/' + id,
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
                    $("#imageDiv").attr("src",data.image);

                    $("#status").val(data.status);
                    $("#date_of_birth").val(data.date_of_birth);

                $("#editUserModal").modal("show");
                }});
      },
      update:function update(){
        var user = {};
        user.name=$("#name").val();
        user.username=$("#username").val();
        user.orders=$("#orders").val();
        user.image=$("#image").val();
        user.status=$("#status").val();
        user.date_of_birth=$("#date_of_birth").val();
        user.last_login_date=$("#last_login_date").val();

        $.ajax({
            url: 'https://lobster-app-7g7zh.ondigitalocean.app/users/update/' + $('#id').val(),
            type: 'PUT',
            data: JSON.stringify(user),
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr){
            },
            success: function(result) {
              console.log(result);
              $("#editUserModal").modal("hide");
              userLogic.populateDashboard();
            }
          });
      },
      add: function(user) {
        $.ajax({
          url: 'https://lobster-app-7g7zh.ondigitalocean.app/register',
          type: 'POST',
          data: JSON.stringify(user),
          contentType: "application/json",
          dataType: "json",
          beforeSend: function(xhr){
          },
          success: function(result) {
            $('#addUserForm').validate();
            $("#addUserModal").modal("hide");
            $('#addUserForm').trigger("reset");
            userLogic.populateDashboard();
          },
          error: function (xhr, tst, err) {
            alert(JSON.parse(xhr.responseText)["message"]);
        }
        });
      },
      logout: function() {
        username=localStorage.getItem("username");
        $.ajax({
          url: 'https://lobster-app-7g7zh.ondigitalocean.app/logout',
          type: 'POST',
          data: JSON.stringify({ username: username }),
          contentType: "application/json",
          dataType: "json",
          beforeSend: function(xhr){
          },
          success: function(result) {
            localStorage.clear();
            window.location.href='https://lobster-app-7g7zh.ondigitalocean.app/login.html';
        },
          error: function (xhr, tst, err) {
            alert(JSON.parse(xhr.responseText)["message"]);
        }
        });
      },


}

$(document).ready(function() {
    userLogic.init();
  });


