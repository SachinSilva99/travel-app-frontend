import {GuideController} from "./controller/GuideController.js";

new GuideController();

document.getElementById('guideIdImgFront').addEventListener('change', function (event) {
    const imageIdFront = document.getElementById('imageIdFront');
    const imageIdFrontSection = document.getElementById('imageIdFrontSection');

    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imageIdFront.src = e.target.result;
            imageIdFrontSection.style.display = 'block';
        };

        reader.readAsDataURL(event.target.files[0]);
    } else {
        imageIdFront.src = '';
        imageIdFrontSection.style.display = 'none';
    }
});

document.getElementById('guideIdImgBack').addEventListener('change', function (event) {
    const imageIdBack = document.getElementById('imageIdBack');
    const imageIdBackSection = document.getElementById('imageIdBackSection');

    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imageIdBack.src = e.target.result;
            imageIdBackSection.style.display = 'block';
        };

        reader.readAsDataURL(event.target.files[0]);
    } else {
        imageIdBack.src = '';
        imageIdBackSection.style.display = 'none';
    }
});

document.getElementById('guideProfileImg').addEventListener('change', function (event) {
    const imageIdBack = document.getElementById('guideImagePicture');
    const imageIdBackSection = document.getElementById('guideImageSection');

    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageIdBack.src = e.target.result;
            imageIdBackSection.style.display = 'block';
        };

        reader.readAsDataURL(event.target.files[0]);
    } else {
        imageIdBack.src = '';
        imageIdBackSection.style.display = 'none';
    }
});

