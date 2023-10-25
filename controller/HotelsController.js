import {StandardResponse} from "../hotel-admin/model/StandardResponse.js";

export class HotelsController {
    constructor() {
        this.hotels = [];
        this.normalHotelApiUrl = "http://localhost:8092/hotelservice/api/v1/getAll";
        this.getAllHotels();
        $('#hotelsContainer').on('click', '.hotel select', this.clickOnHotel.bind(this));

    }

    clickOnHotel(e) {
        const selectedHotelId = e.target.closest('.hotel').id;
        const selectedPackage = e.target.value;
        if (selectedPackage === '' || selectedPackage === null) {
            const packageInfoElement = $(`#${selectedHotelId} .package-info`);
            const packageHtml = ``;
            packageInfoElement.html(packageHtml);
            return;
        }
        console.log(selectedHotelId, selectedPackage);
        this.loadPackages(selectedHotelId, selectedPackage);
    }

    loadPackages(hotelId, hotelPackageId) {
        $.ajax({
            url: `${this.normalHotelApiUrl}/hotelPackage/${hotelPackageId}`,
            type: "GET",
            dataType: "json",
            success: (res) => {
                console.log(res)
                const packageInfoElement = $(`#${hotelId} .package-info`);
                const packageData = res.data;
                const packageHtml = `
                    <div class="package-info col-12">
                      <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                      <div class="form-group">
                        <label for="hotelPackageType">Hotel Package type</label>
                        <input type="text" class="form-control mt-1" value="${packageData.hotelPackageType}" readonly>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                      <div class="form-group">
                        <label for="hotelRoomType">Hotel Room type</label>
                        <input type="text" class="form-control mt-1" id="hotelRoomType" value="${packageData.hotelPackageRoomType}">
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                      <div class="form-group">
                        <label for="hotelPackagePrice">Hotel Package Price</label>
                        <input type="number" class="form-control mt-1" id="hotelPackagePrice" value="${packageData.hotelPackagePrice}">
                      </div>
                    </div>
                    </div>
                `;
                packageInfoElement.html(packageHtml);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }

    getAllHotels() {
        $.ajax({
            url: this.normalHotelApiUrl,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.hotels = standardResponse.data;
                this.loadData(standardResponse.data);
                console.log(this.hotels)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }

    loadData(data) {
        $('#hotelsContainer').innerHTML = '';
        let innerHtml = ``;
        this.hotels.forEach(hotel => {
            console.log('works');
            const hotelPackageDtos = hotel.hotelPackageDTOS;
            let selectOptions = '';

            hotelPackageDtos.forEach(hotelPackage => {
                selectOptions += `<option value="${hotelPackage.hotelPackageId}">${hotelPackage.hotelPackageId}</option>`;
            });
            let hotelHtml = `
                     <div class="col-12 bg-light m-5 hotel" id="${hotel.hotelId}">
<!--          <h2>My Hotel</h2>-->
          <h5 class="card-title">${hotel.hotelName}</h5>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
              <img class="hotelImage" src="images/34021085.jpg">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
              <img class="hotelImage" src="images/maxresdefault.jpg">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
              <img class="hotelImage " src="images/photo8jpg.jpg">
            </div>
            <div class="row"></div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
              <div class="form-group">
                <label for="hotelId">Hotel Id </label>
                <input type="text" class=" form-control mt-1 custom-text-color" value="${hotel.hotelId}"
                       readonly>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
              <div class="form-group">
                <label for="hotelName">Name</label>
                <input type="text" class="field form-control mt-1" value="${hotel.hotelName}"
                       readonly>
                <div class="invalid-feedback">Invalid hotel name.</div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-4 ">
              <div class="form-group mt-1">
                <label for="hotelCategory">Hotel Category</label>
                <input type="text" class="field form-control mt-1" value="${hotel.hotelCategory}" readonly>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
              <div class="form-group mt-1">
                <div class="form-group">
                  <label for="hotelLocation">Location</label>
                  <input type="text" class="form-control mt-1" value="${hotel.hotelLocation}"
                         readonly>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-12 mt-4 ">
              <div class="form-group">
                <label for="hotelEmail">Hotel Email</label>
                <input type="email" class="form-control mt-1" value="${hotel.hotelEmail}" readonly>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-12 mt-4 ">
              <div class="form-group">
                <label for="hotelContact">Hotel contact</label>
                <input type="text" class="form-control mt-1" value="${hotel.hotelContactNumber}"
                       readonly>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-4 ">
              <div class="form-group mt-1">
                <label for="isHotelPetsAllowed">Is Pets Allowed</label>
                <input type="text" class="form-control mt-1" value="${hotel.isHotelPetsAllowed ? "Yes" : "No"}"
                       readonly>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-4 ">
              <div class="form-group mt-1">
                <label for="isHotelCancellationCriteriaFree">Is Hotel Cancellation Criteria Free</label>
                <input type="text" class="form-control mt-1" value="${hotel.isHotelCancellationCriteriaFree ? "Yes" : "No"}"
                       readonly>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
              <div class="form-group">
                <label for="hotelCancellationCost">Hotel Cancellation Cost</label>
                <input type="number" class="form-control mt-1" value="${hotel.hotelCancellationCost}" readonly>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
              <div class="form-group">
                <label for="hotelPackage">Select Package</label>
                <select class="form-control">
                  <option value="">Select Package</option>
                  ${selectOptions}
                </select>
              </div>
            </div>
       
                <div class="package-info">
            </div>
            </div>
         
      
          </div>
        </div> `;
            innerHtml += hotelHtml;
        });
        $('#hotelsContainer').html(innerHtml);
    }
}