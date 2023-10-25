import {HotelsController} from "./controller/HotelsController.js";
import {DashboardController} from "./controller/DashboardController.js";


hideAll();

function hideAll() {
    $('#hotels, #vehicles, #guides, #home').hide();
}

$('#home').show();
$('.navbar-nav .nav-link').click(function () {
    const targetId = $(this).attr('href');
    hideAll();
    $(targetId).show();
});
new DashboardController();
new HotelsController();

// pacakge click show-----------------------------------------

// pacakge click show-----------------------------------------





