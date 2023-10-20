import {VehicleController} from "./controller/GuideController.js";

new VehicleController();

function handleImageChange(inputElement, imageElement, imageSectionElement) {
    inputElement.addEventListener('change', function (event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageElement.src = e.target.result;
                imageSectionElement.style.display = 'block';
            };

            reader.readAsDataURL(event.target.files[0]);
        } else {
            imageElement.src = '';
            imageSectionElement.style.display = 'none';
        }
    });
}

handleImageChange(
    document.getElementById('vehicleMainImage'),
    document.getElementById('vehicleMainPic'),
    document.getElementById('vehicleMainPicSection')
);

handleImageChange(
    document.getElementById('vehicleImgFront'),
    document.getElementById('vehicleFrontPic'),
    document.getElementById('vehicleFrontPicSection')
);

handleImageChange(
    document.getElementById('vehicleImgBack'),
    document.getElementById('vehicleBackPic'),
    document.getElementById('vehicleBackPicSection')
);
handleImageChange(
    document.getElementById('vehicleImgBackInterior'),
    document.getElementById('vehicleBackInteriorPic'),
    document.getElementById('vehicleBackInteriorPicSection')
);
handleImageChange(
    document.getElementById('vehicleImgFrontInterior'),
    document.getElementById('vehicleFrontInteriorPic'),
    document.getElementById('vehicleFrontInteriorPicSection')
);
