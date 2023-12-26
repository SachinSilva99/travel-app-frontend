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
                localStorage.setItem('userAdminAccessToken', response.data.access_token);
                window.location.href = '../user-admin/index.html';
            }
            if (userToken.userType === 'VEHICLE_ADMIN') {
                localStorage.setItem('vehicleAdminAccessToken', response.data.access_token);
                window.location.href = '../vehicle-admin/index.html';
            }
            if (userToken.userType === 'GUIDE_ADMIN') {
                localStorage.setItem('guideAdminAccessToken', response.data.access_token);
                window.location.href = '../guide-admin/index.html';
            }
            if (userToken.userType === 'TRAVEL_ADMIN') {
                localStorage.setItem('travelAdminAccessToken', response.data.access_token);
                window.location.href = '../travel-admin/index.html';
            }
            if (userToken.userType === 'HOTEL_ADMIN') {
                localStorage.setItem('hotelAdminAccessToken', response.data.access_token);
                window.location.href = '../hotel-admin/index.html';
            }
            if (userToken.userType === 'REGISTERED_USER') {
                localStorage.setItem('registeredCustomerAccessToken', response.data.access_token);
                localStorage.setItem('currentUser', userToken.sub);
                window.location.href = '../index.html';
            }
        },
        statusCode: {
            403: ()=> {
                alert( "wrong username or password!" );
            }
        },
        error: (error) => {
            console.error("Error : " + error);
        }
    });
});

