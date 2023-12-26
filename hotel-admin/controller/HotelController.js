import {HotelDTO} from "../model/HotelDto.js";
import {HotelPackageDTO} from "../model/HotelPackageDto.js";
import {StandardResponse} from "../model/StandardResponse.js";

export class HotelController {

  constructor() {
    this.setUpMap();
    this.hotelApi = "http://localhost:8092/hotelservice/api/v1/hotels";
    this.getAllHotels();
    this.lat = null;
    this.lng = null;


    this.hotels = [];
    $(document).ready(this.handleHotelPackage.bind(this));
    $('#addBtn').click(this.createHotel.bind(this));
    $('#updateBtn').click(this.updateHotel.bind(this));
    $('#clearFieldBtn').click(this.clearFields.bind(this));
    $('#deleteImageYes').click(this.deleteImage.bind(this));
    $('#logout').click(this.logout.bind(this));
    $(".field").on("keyup", this.field.bind(this));
    this.hotelNameElement = $('#hotelName');
    this.hotelIdElement = $('#hotelId');
    this.hotelRemarksElement = $('#hotelRemarks');
    this.hotelCategoryElement = $('#hotelCategory');
    this.hotelLocationElement = $('#hotelLocation');
    this.hotelEmailElement = $('#hotelEmail');
    this.hotelPetsAllowedElement = $('#isHotelPetsAllowed');
    this.hotelCancellationCostElement = $('#hotelCancellationCost');
    this.hotelIsCancelledElement = $('#isHotelCancellationCriteriaFree');
    this.hotelImageInputsElement = $('#imageInput');
    this.hotelContactElement = $('#hotelContact');
    this.hotelLocationLatElement = $('#hotelLocationLat');
    this.hotelLocationLngElement = $('#hotelLocationLng');
    $('#hotelsContainer').on('click', '.card', this.clickOnCard.bind(this));
    $('#imageDisplay').on('click', '.card', this.getImageId.bind(this));
    this.selectedImageId = null;
    this.selectedHotel = null;
  }

  logout() {
    $.ajax({
      type: "POST",
      url: "http://localhost:8090/userservice/api/v1/auth/logout",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      success: (res) => {
        window.location.href = '../Login/index.html';
      },
      error: (error) => {
      }
    });
  }

  setUpMap() {
    const loadMapScenario = () => {
      const map = new Microsoft.Maps.Map(document.getElementById("map"), {
        credentials: "As48ZOnLQzhw1DkQtfwoFydwi7jCxxJoKMOfVoLxlDL9IGCVTQv",
        center: new Microsoft.Maps.Location(6.58274089537376, 79.96377931723782),
        zoom: 10,
      });

      Microsoft.Maps.Events.addHandler(map, "click", (e) => {
        const location = e.location;
        this.lat = location.latitude;
        this.lng = location.longitude;
        this.hotelLocationLatElement.val(this.lat);
        this.hotelLocationLngElement.val(this.lng);
        const pushpin = new Microsoft.Maps.Pushpin(location, {
          color: 'red',
          title: "Latitude: " +
            location.latitude +
            ", Longitude: " +
            location.longitude
        });

        map.entities.clear();
        map.entities.push(pushpin);
      });
    }

    loadMapScenario();
  }


  field(e) {
    console.log('typed');
    console.log(e.target.id);
    const hotelName = this.hotelNameElement.val();
    const hotelNameRegex = /^[\s\S]+$/;
    if (!hotelNameRegex.test(hotelName)) {
      this.hotelNameElement.addClass('is-invalid');
      return;
    }
    this.hotelNameElement.removeClass('is-invalid');

  }

  getImageId(e) {
    this.selectedImageId = e.target.id;
  }

  deleteImage() {
    console.log(this.selectedImageId);
    $.ajax({
      url: this.hotelApi + '/images/' + this.selectedImageId,
      type: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('hotelAdminAccessToken')}`
      },
      success: () => {
        const imageContainerId = `imageContainer_${this.selectedImageId}`;
        $(`#${imageContainerId}`).remove();
        this.selectedImageId = null;
        this.getAllHotels();
      },
      error: function () {
        alert("Failed to delete guide");
      }
    });
  }

  handleHotelPackage() {
    const packageContainer = $("#packageContainer");
    const addPackageButton = $("#addPackageButton");
    let packageId = 1;

    addPackageButton.on("click", function () {
      const row = $("<div>").addClass("row").attr("id", "packageRow").html(`
      <div class="col-lg-2 col-md-6 col-sm-12">
        <div class="form-group mt-1">
          <div class="form-group">
            <label for="hotelPackageId">Package Id</label>
            <input type="number" class="form-control mt-1" id="hotelPackageId" placeholder="READ ONLY" value="${packageId}" readonly>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-6 col-sm-12">
        <div class="form-group mt-1">
          <label for="hotelPackageType">Hotel Package Type</label>
          <select class="form-select m-1" id="hotelPackageType">
            <option selected value="FULL_BOARD">FULL_BOARD</option>
            <option value="HALF_BOARD">HALF_BOARD</option>
          </select>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="form-group mt-1">
          <label for="hotelPackageRoomType">Hotel Room Type</label>
          <select class="form-select m-1" id="hotelPackageRoomType">
            <option selected value="AC_Luxury_Room_Double">AC Luxury Double Room</option>
            <option value="AC_Luxury_Room_TRIPLE">AC Luxury Triple Room</option>
          </select>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <div class="form-group mt-1">
          <div class="form-group">
            <label for="hotelPackagePrice">Package Price</label>
            <input type="number" class="form-control mt-1" id="hotelPackagePrice" placeholder="Enter Package Price" required>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-6 col-sm-12 mt-4">
        <button class="col btn btn-danger delete-button">Delete</button>
      </div>
    `);
      row.find(".delete-button").on("click", function () {
        row.remove();
      });
      packageContainer.append(row);
      packageId++;
    });
  }


  createHotel() {
    const hotelId = this.hotelIdElement.val();
    if (!this.allFieldsAreValidated()) {
      alert('fields are null');
      return;
    }
    const emptyOrWhiteSpaceRegex = /^[\s]*$/;
    if (!emptyOrWhiteSpaceRegex.test(hotelId)) {
      alert("you should update");
      return;
    }

    const hotelName = this.hotelNameElement.val();
    const hotelCategory = this.hotelCategoryElement.val();
    const location = this.hotelLocationElement.val();
    const email = this.hotelEmailElement.val();
    const isPetsAllowed = this.hotelPetsAllowedElement.val();
    const hotelContact = this.hotelContactElement.val();
    const isCriteriaFree = this.hotelIsCancelledElement.val();
    const hotelRemarks = this.hotelRemarksElement.val();
    const hotelLocationLat = this.hotelLocationLatElement.val();
    const hotelLocationLng = this.hotelLocationLngElement.val();
    let hotelCancellationCost = 0;
    if (isCriteriaFree !== null) {
      hotelCancellationCost = this.hotelCancellationCostElement.val();
    }

    const packageContainers = document.querySelectorAll('#packageContainer .row');
    const packages = [];

    packageContainers.forEach((container) => {
      const packageId = container.querySelector('#hotelPackageId').value;
      const packageType = container.querySelector('#hotelPackageType').value;
      const roomType = container.querySelector('#hotelPackageRoomType').value;
      const packagePrice = container.querySelector('#hotelPackagePrice').value;

      const hotelPackage = new HotelPackageDTO(packageId, packageType, roomType, packagePrice);
      packages.push(hotelPackage);
    });


    const hotelDto = new HotelDTO(
      hotelName,
      hotelCategory,
      location,
      email,
      hotelContact,
      isPetsAllowed,
      hotelCancellationCost,
      isCriteriaFree,
      packages,
      hotelRemarks,
      hotelLocationLat,
      hotelLocationLng
    );
    const formData = new FormData();
    const jsonDTO = JSON.stringify(hotelDto);
    const blob = new Blob([jsonDTO], {type: 'application/json'});

    formData.append("hotelDTO", blob);
    for (let i = 0; i < this.hotelImageInputsElement[0].files.length; i++) {
      formData.append("hotelImagesRequest", this.hotelImageInputsElement[0].files[i]);
    }
    console.log(hotelDto)
    $.ajax({
      type: "POST",
      url: "http://localhost:8092/hotelservice/api/v1/hotels",
      data: formData,
      processData: false,
      contentType: false,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('hotelAdminAccessToken')}`
      },
      success: (response) => {
        console.log("Guide saved successfully. User ID: " + response.data);
        this.getAllHotels();
        this.clearFields();
      },
      error: (error) => {
        console.error("Error saving guide: " + error.responseText);
      }
    });
  }

  updateHotel() {
    const hotelId = this.hotelIdElement.val()
    if (hotelId === null || hotelId === undefined || hotelId === '') {
      alert("pick a hotel first");
      return;
    }

    $('#updateConfirmationModal').modal('show');
    $('#confirmUpdateButton').click(() => {
      $('#updateConfirmationModal').modal('hide');
      this.performUpdate();
    });

  }

  getAllHotels() {
    $.ajax({
      url: this.hotelApi,
      type: "GET",
      dataType: "json",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('hotelAdminAccessToken')}`
      },
      success: (res) => {
        const standardResponse = new StandardResponse(res.code, res.msg, res.data);
        this.loadData(standardResponse.data);
        this.hotels = standardResponse.data;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + errorThrown);
      }
    });
  }

  clickOnCard(e) {
    const target = $(e.target);

    const hotelId = e.currentTarget.id;
    const hotel = this.hotels.find(value => value.hotelId === hotelId);
    this.selectedHotel = hotel;
    if (target.is('#delete')) {
      return;
    }

    this.hotelNameElement.val(hotel.hotelName);
    this.hotelCategoryElement.val(hotel.hotelCategory);
    this.hotelIdElement.val(hotel.hotelId);
    this.hotelLocationElement.val(hotel.hotelLocation);
    this.hotelEmailElement.val(hotel.hotelEmail);
    this.hotelPetsAllowedElement.val(hotel.isHotelPetsAllowed.toString());
    this.hotelContactElement.val(hotel.hotelContactNumber);
    this.hotelIsCancelledElement.val(hotel.isHotelCancellationCriteriaFree.toString());
    this.hotelCancellationCostElement.val(hotel.hotelCancellationCost);
    this.hotelLocationLatElement.val(hotel.hotelLocationLat);
    this.hotelLocationLngElement.val(hotel.hotelLocationLng);

    const imageDisplay = $('#imageDisplay');
    const hotelImageDTOS = hotel.hotelImageDTOS;
    imageDisplay.html('');
    hotelImageDTOS.forEach(hotelImageDto => {
      const imageContainer = $('<div>', {'class': 'card col-lg-3 col-md-6 col-sm-12 m-3 bg-light border'});
      const deleteButton = document.createElement('button');

      const imageContainerId = `imageContainer_${hotelImageDto.hotelImageId}`;
      imageContainer.attr('id', imageContainerId);

      deleteButton.textContent = 'Delete This Image';
      deleteButton.setAttribute('data-bs-toggle', 'modal');
      deleteButton.setAttribute('data-bs-target', '#modal');
      deleteButton.classList.add('m-3', 'btn', 'btn-danger', 'delete-button');
      deleteButton.id = hotelImageDto.hotelImageId;

      const image = $(
        '<img>', {
          'src': `data:image/**;base64,${hotelImageDto.hotelImgValue}`,
          'class': 'uploaded-image m-1'
        });
      imageContainer.append(image)
      imageContainer.append(deleteButton)
      imageDisplay.append(imageContainer);
    });

    const packageDisplay = $('#existingPackages');
    packageDisplay.html('');
    const hotelPackageDTOS = hotel.hotelPackageDTOS;
    hotelPackageDTOS.forEach(packageDto => {
      const cardContainer = $('<div>', {'class': 'col-lg-3 col-md-6 col-sm-12 mt-4'});
      const card = $('<div>', {'class': 'card'});

      const cardHeader = $('<div>', {'class': 'card-header', 'text': packageDto.hotelPackageType});
      card.append(cardHeader);

      const cardBody = $('<div>', {'class': 'card-body'});
      const text = $('<h6>', {'class': 'card-title', 'text': `ID: ${packageDto.hotelPackageId}`});
      const roomType = $('<p>', {'class': 'card-text', 'text': `Room Type: ${packageDto.hotelPackageRoomType}`});
      const price = $('<p>', {'class': 'card-text', 'text': `Price: Rs. ${packageDto.hotelPackagePrice}`});

      cardBody.append(text, roomType, price);

      const deleteButton = $('<button>', {'class': 'btn btn-danger', 'text': 'Delete'});

      cardBody.append(deleteButton);
      card.append(cardBody);
      cardContainer.append(card);
      packageDisplay.append(cardContainer);
    });

  }

  clearFields() {
    $('#existingPackages').remove();
    $('#packageRow').remove();
    this.hotelImageInputsElement = $('#imageInput').val('');
    $('#imageDisplay').html('');
    this.hotelNameElement.val('');
    this.hotelIdElement.val('');
    this.hotelCategoryElement.val('');
    this.hotelLocationElement.val('');
    this.hotelEmailElement.val('');
    this.hotelPetsAllowedElement.val('true');
    this.hotelContactElement.val('');
    this.hotelIsCancelledElement.val('true');
    this.hotelRemarksElement.val('');
    this.hotelCancellationCostElement.val(0);
    this.hotelLocationLatElement.val('');
    this.hotelLocationLngElement.val('');
    this.hotelLocationLatElement.val('');
    this.hotelLocationLngElement.val('');
  }

  loadData(data) {
    const hotelsContainer = document.getElementById("hotelsContainer");
    hotelsContainer.innerHTML = "";
    console.log(data);
    data.forEach((hotelDto) => {
      const hotelCard = document.createElement("div");
      hotelCard.className = "card col-lg-3 col-md-6 col-sm-12 m-4";
      hotelCard.id = hotelDto.hotelId;
      hotelCard.innerHTML = `
                <div class="card-body">
                    <h6 class="mb-2">Hotel Id: <span class="hotelId" style="color: #0a53be">${hotelDto.hotelId}</span></h6>
                    <h5 class="card-title">${hotelDto.hotelName}</h5>
                    <img class="card-img-top" src="data:image/**;base64,${hotelDto.hotelImagesStrings[0]}" alt="Card image cap">
                    <h5 class="contact mt-3">${hotelDto.hotelContactNumber}</h5>
                    <button id="delete" class="btn btn-danger" data-bs-toggle = "modal" data-bs-target="#modal">Delete Hotel</button>
                </div>`;
      hotelsContainer.appendChild(hotelCard);
    });
  }

  performUpdate() {
    const hotelName = this.hotelNameElement.val();
    const hotelId = this.hotelIdElement.val();
    const hotelCategory = this.hotelCategoryElement.val();
    const location = this.hotelLocationElement.val();
    const email = this.hotelEmailElement.val();
    const isPetsAllowed = this.hotelPetsAllowedElement.val();
    const hotelContact = this.hotelContactElement.val();
    const isCriteriaFree = this.hotelIsCancelledElement.val();
    const hotelRemarks = this.hotelRemarksElement.val();
    const hotelLocationLat = this.hotelLocationLatElement.val();
    const hotelLocationLng = this.hotelLocationLngElement.val();
    let hotelCancellationCost = 0;
    if (isCriteriaFree !== null) {
      hotelCancellationCost = this.hotelCancellationCostElement.val();
    }

    const packageContainers = document.querySelectorAll('#packageContainer .row');
    const packages = [];

    packageContainers.forEach((container) => {
      const packageId = container.querySelector('#hotelPackageId').value;
      const packageType = container.querySelector('#hotelPackageType').value;
      const roomType = container.querySelector('#hotelPackageRoomType').value;
      const packagePrice = container.querySelector('#hotelPackagePrice').value;

      const hotelPackage = new HotelPackageDTO(packageId, packageType, roomType, packagePrice);
      packages.push(hotelPackage);
    });


    const hotelDto = new HotelDTO(
      hotelName,
      hotelCategory,
      location,
      email,
      hotelContact,
      isPetsAllowed,
      hotelCancellationCost,
      isCriteriaFree,
      packages,
      hotelRemarks,
      hotelLocationLat,
      hotelLocationLng
    );
    const formData = new FormData();
    const jsonDTO = JSON.stringify(hotelDto);
    const blob = new Blob([jsonDTO], {type: 'application/json'});

    formData.append("hotelDTO", blob);
    for (let i = 0; i < this.hotelImageInputsElement[0].files.length; i++) {
      formData.append("hotelImagesRequest", this.hotelImageInputsElement[0].files[i]);
    }
    console.log(hotelDto)
    $.ajax({
      type: "PUT",
      url: "http://localhost:8092/hotelservice/api/v1/hotels" + "/" + hotelId,
      data: formData,
      processData: false,
      contentType: false,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('hotelAdminAccessToken')}`
      },
      success: () => {
        console.log("Guide updated successfully. User ID: ");
        this.getAllHotels();
        this.clearFields();
      },
      error: (error) => {
        console.error("Error saving guide: " + error.responseText);
      }
    });
  }

  allFieldsAreValidated() {
    const hotelName = this.hotelNameElement.val();
    const hotelCategory = this.hotelCategoryElement.val();
    const location = this.hotelLocationElement.val();
    const email = this.hotelEmailElement.val();
    const isPetsAllowed = this.hotelPetsAllowedElement.val();
    const hotelContact = this.hotelContactElement.val();
    const isCriteriaFree = this.hotelIsCancelledElement.val();
    const hotelLocationLat = this.hotelLocationLatElement.val();
    const hotelLocationLng = this.hotelLocationLngElement.val();
    const hotelRemarks = this.hotelRemarksElement.val();

    const hotelNameRegex = /^[\s\S]+$/; // Not empty
    const categoryRegex = /^[\s\S]+$/; // Not empty
    const locationRegex = /^[\s\S]+$/; // Not empty
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Basic email format
    const petsAllowedRegex = /^[\s\S]+$/; // Not empty
    const contactRegex = /^[\s\S]+$/; // Not empty
    const criteriaFreeRegex = /^[\s\S]+$/; // Not empty

    if (!hotelNameRegex.test(hotelName)) {
      this.hotelNameElement.addClass('is-invalid');
      return false;
    }

    if (!categoryRegex.test(hotelCategory)) {
      console.log('Invalid hotel category');
      this.hotelCategoryElement.addClass('is-invalid');
      return false;
    }

    if (!locationRegex.test(location)) {
      console.log('Invalid location');
      return false;
    }

    if (!emailRegex.test(email)) {
      console.log('Invalid email');
      return false;
    }

    if (!petsAllowedRegex.test(isPetsAllowed)) {
      console.log('Invalid pets allowed field');
      return false;
    }

    if (!contactRegex.test(hotelContact)) {
      console.log('Invalid hotel contact');
      return false;
    }

    if (!criteriaFreeRegex.test(isCriteriaFree)) {
      console.log('Invalid criteria free field');
      return false;
    }

    return true;

  }


}