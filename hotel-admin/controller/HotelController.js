import {HotelDTO} from "../model/HotelDto.js";
import {HotelPackageDTO} from "../model/HotelPackageDto.js";
import {StandardResponse} from "../model/StandardResponse.js";

export class HotelController {

    constructor() {
        this.hotelApi = "http://localhost:8092/hotelservice/api/v1/hotels";
        this.getAllHotels();
        this.hotels = [];
        $(document).ready(this.handleHotelPackage.bind(this));
        $('#addBtn').click(this.createHotel.bind(this));
        this.hotelNameElement = $('#hotelName');
        this.hotelCategoryElement = $('#hotelCategory');
        this.hotelLocationElement = $('#hotelLocation');
        this.hotelEmailElement = $('#hotelEmail');
        this.hotelPetsAllowedElement = $('#isHotelPetsAllowed');
        this.hotelCancellationCostElement = $('#hotelCancellationCost');
        this.hotelIsCancelledElement = $('#isHotelCancellationCriteriaFree');
        this.hotelImageInputsElement = $('#imageInput');
        this.hotelContactElement = $('#hotelContact');
    }

    handleHotelPackage() {
        const packageContainer = document.getElementById("packageContainer");
        const addPackageButton = document.getElementById("addPackageButton");
        let packageId = 1;

        addPackageButton.addEventListener("click", function () {
            const row = document.createElement("div");
            row.className = "row";

            row.innerHTML = `
              <div class="col-lg-2 col-md-6 col-sm-12">
                <div class="form-group mt-1">
                  <div class="form-group">
                    <label for="hotelPackageId">Package Id</label>
                    <input type="number" class="form-control mt-1" id="hotelPackageId" placeholder="READ ONLY" value="${packageId}"
                           readonly>
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
                    <input type="number" class="form-control mt-1" id="hotelPackagePrice" placeholder="Enter Package Price"
                           required>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-6 col-sm-12 mt-4">
                <button class="col btn btn-danger delete-button">Delete</button>
              </div>`;
            const deleteButton = row.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => {
                packageContainer.removeChild(row);
            });

            packageContainer.appendChild(row);
            packageId++;
        });
    }

    createHotel() {
        const hotelName = this.hotelNameElement.val();
        const hotelCategory = this.hotelCategoryElement.val();
        const location = this.hotelLocationElement.val();
        const email = this.hotelEmailElement.val();
        const isPetsAllowed = this.hotelPetsAllowedElement.val();
        const hotelContact = this.hotelContactElement.val();
        const isCriteriaFree = this.hotelIsCancelledElement.val();
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


        const hotelDto = new HotelDTO(hotelName,
            hotelCategory, location, email, hotelContact, isPetsAllowed, hotelCancellationCost, isCriteriaFree, packages);
        const formData = new FormData();
        const jsonDTO = JSON.stringify(hotelDto);
        const blob = new Blob([jsonDTO], {type: 'application/json'});

        formData.append("hotelDTO", blob);
        for (let i = 0; i < this.hotelImageInputsElement[0].files.length; i++) {
            formData.append("hotelImagesRequest", this.hotelImageInputsElement[0].files[i]);
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:8092/hotelservice/api/v1/hotels",
            data: formData,
            processData: false,
            contentType: false,
            success: (response) => {
                console.log("Guide saved successfully. User ID: " + response.data);
            },
            error: (error) => {
                console.error("Error saving guide: " + error.responseText);
            }
        });
    }

    getAllHotels() {
        $.ajax({
            url: this.hotelApi,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.loadData(standardResponse.data);
                this.hotels = standardResponse.data;
                console.log(this.hotels)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
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
                    <button id="delete" class="btn btn-danger" data-bs-toggle = "modal" data-bs-target="#modal">Delete</button>
                </div>`;
            hotelsContainer.appendChild(hotelCard);
        });
    }
}