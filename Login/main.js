$('#login').click((e) => {
    e.preventDefault();
    console.log(e);
    console.log('hello')

    const username = $('#username').val();
    const password = $('#password').val();
    const request = {username, password}
    $.ajax({
        type: "POST",
        url: "http://localhost:8090/userservice/api/v1/auth/authenticate",
        data: JSON.stringify(request),
        contentType: "application/json",
        processData: false,
        dataType: "json",
        success: (response) => {
            console.log(response);
            function decodeJWT(token) {
                const payloadBase64 = token.split('.')[1];
                const payload = atob(payloadBase64);
                return JSON.parse(payload);
            }
            const userToken = decodeJWT(response.data.access_token);
            if (userToken.userType === 'USER_ADMIN') {
                localStorage.setItem('accessToken', response.data.access_token);
                localStorage.setItem('currentUser', userToken.sub);
                window.location.href = '../user-admin/index.html';
            }
            console.log(userToken);
        },
        error: (error) => {
            console.error("Error saving guide: " + error.responseText);
        }
    });
});

