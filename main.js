import {HotelsController} from "./controller/HotelsController.js";
import {DashboardController} from "./controller/DashboardController.js";
import {VehicleController} from "./controller/VehicleController.js";


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
new DashboardController();
new HotelsController();
new VehicleController();

// pacakge click show-----------------------------------------

// pacakge click show-----------------------------------------





