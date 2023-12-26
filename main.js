import {HotelsController} from "./controller/HotelsController.js";
import {DashboardController} from "./controller/DashboardController.js";
import {VehicleController} from "./controller/VehicleController.js";
import {ManageTravelController} from "./controller/ManageTravelController.js";
new DashboardController();
new HotelsController();
new VehicleController();
new ManageTravelController();
const registeredCustomerAccessToken = localStorage.getItem('registeredCustomerAccessToken');
if (!registeredCustomerAccessToken) {
    $('#manageTravels').hide();
    $('#manageTravelsNavItem').hide();
    $('#loggedView').hide();
    $('#notLogged').show();
    $('#login').show();
}else {
    $('#manageTravels').show();
    $('#manageTravelsNavItem').show();
    $('#loggedView').show();
    $('#notLogged').hide();
    $('#logout').show();
}
hideAll();

function hideAll() {
    $('#hotels, #vehicles, #guides, #home, #manageTravels').hide();
}

$('#home').show();
$('.navbar-nav .nav-link').on('click', function () {
    const targetId = $(this).attr('href');
    hideAll();
    $(targetId).show();
});


// pacakge click show-----------------------------------------

// pacakge click show-----------------------------------------





