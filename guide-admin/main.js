import { GuideController } from "./controller/GuideController.js";

new GuideController();

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
    const imageIdFront = $('#imageIdFront');
    const imageIdFrontSection = $('#imageIdFrontSection');

    const imageIdBack = $('#imageIdBack');
    const imageIdBackSection = $('#imageIdBackSection');

    const guideImagePicture = $('#guideImagePicture');
    const guideImageSection = $('#guideImageSection');

    handleImageChange($('#guideIdImgFront'), imageIdFront, imageIdFrontSection);
    handleImageChange($('#guideIdImgBack'), imageIdBack, imageIdBackSection);
    handleImageChange($('#guideProfileImg'), guideImagePicture, guideImageSection);
});
