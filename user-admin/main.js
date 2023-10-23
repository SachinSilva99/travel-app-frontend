import {UserController} from "./controller/UserController.js";


function handleImageChange(inputElement, imageView, sectionView) {
    inputElement.on('change', function (event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageView.attr('src', e.target.result);
                sectionView.css('display', 'block');
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            imageView.attr('src', '');
            sectionView.css('display', 'none');
        }
    });
}

$(document).ready(function () {
    const profilePicture = $('#profilePicturePic');
    const profilePicturePicSection = $('#profilePicturePicSection');
    const profilePictureInput = $('#profilePicture');

    const nicPassportBackInput = $('#nicPassportBack');
    const nicPassportBackImg = $('#nicPassportBackImg');
    const nicPassportBackImgSection = $('#nicPassportBackImgSection');

    const nicPassportFrontInput = $('#nicPassportFront');
    const nicPassportFront = $('#nicPassportFrontImg');
    const nicPassportFrontImgSection = $('#nicPassportFrontImgSection');

    handleImageChange(profilePictureInput, profilePicture, profilePicturePicSection);
    handleImageChange(nicPassportBackInput, nicPassportBackImg, nicPassportBackImgSection);
    handleImageChange(nicPassportFrontInput, nicPassportFront, nicPassportFrontImgSection);
});
new UserController();





