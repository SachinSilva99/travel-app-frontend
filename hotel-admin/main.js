import {HotelController} from "./controller/HotelController.js";
new HotelController();
function displayImages(event) {
    const imageDisplay = document.getElementById('imageDisplay');
    // imageDisplay.innerHTML = '';

    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const image = document.createElement('img');
        if (i === 0) {
            image.id = 'mainImage';
            const mainImageText = document.createElement('h6');
            mainImageText.className = 'text-info';
            mainImageText.textContent = 'Main Image';
            imageDisplay.appendChild(mainImageText);
        }
        image.src = URL.createObjectURL(file);
        image.className = 'uploaded-image m-lg-3 m-md-2 m-sm-1';
        imageDisplay.appendChild(image);
    }
}

const imageInput = document.getElementById('imageInput');
imageInput.addEventListener('change', displayImages);



/*
const add = document.getElementById("addBtn");
add.addEventListener("click", function () {
    const addedPackages = getPackages();
    console.log(addedPackages);
});*/
