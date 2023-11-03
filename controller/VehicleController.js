import {StandardResponse} from "../vehicle-admin/model/StandardResponse.js";

export class VehicleController {
    constructor() {
        this.vehciles = [];
        this.vehicleApiUrl = "http://localhost:8095/vehicleservice/api/v1/getvehicles";
        this.getAllVehicles();
    }

    getAllVehicles() {
        $.ajax({
            url: this.vehicleApiUrl,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.vehicles = standardResponse.data;
                this.loadData();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }

    loadData() {
        $('#vehiclesContainer').innerHTML = '';
        let innerHtml = ``;
        this.vehicles.forEach(vehicle => {
            let hotelHtml = `
                     <div class="col-12 bg-light m-5 hotel" id="${vehicle.vehicleId}">
          <h5 class="card-title">${vehicle.vehicleName}</h5>
          <div class="row">
          <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
              <img class="hotelImage" src="${`data:image/**;base64,${vehicle.vehicleMainImage}`}">
           </div>
          <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
              <img class="hotelImage" src="${`data:image/**;base64,${vehicle.vehicleImgFront}`}">
           </div>
          <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
              <img class="hotelImage" src="${`data:image/**;base64,${vehicle.vehicleImgBack}`}">
           </div>
          <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
              <img class="hotelImage" src="${`data:image/**;base64,${vehicle.vehicleImgFrontInterior}`}">
           </div>
          <div class="col-lg-6 col-md-6 col-sm-12 mt-4">
              <img class="hotelImage" src="${`data:image/**;base64,${vehicle.vehicleImgBackInterior}`}">
           </div>
        </div>
          
             <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                 <div class="form-group">
                  <label for="vehicleId">Vehicle Id </label>
                  <input type="text" class="form-control mt-1 custom-text-color" id="sVehicleId" placeholder="Read Only"
                         value="${vehicle.vehicleId}"
                         readonly>
                </div>
            </div>
          <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
            <div class="form-group">
              <label for="vehicleBrand">Vehicle Brand</label>
              <input type="text" class="form-control mt-1" id="vehicleBrand"  value="${vehicle.vehicleBrand}" required>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
            <div class="form-group">
              <label for="vehicleName">Vehicle Name</label>
              <input type="text" class="form-control mt-1" id="vehicleName" value="${vehicle.vehicleName}"required>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 mt-4 ">
            <div class="form-group mt-1">
              <label for="vehicleCategory">Select Vehicle Category:</label>
              <input type="text" class="form-control mt-1" id="vehicleCategory" value="${vehicle.vehicleCategory}" readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
            <div class="form-group mt-1">
              <label for="vehicleFuelType">Select Vehicle Fuel Type:</label>
              <input type="text" class="form-control mt-1" id="vehicleFuelType" value="${vehicle.vehicleFuelType}" readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-12 mt-4 ">
            <div class="form-group">
              <label for="vehicleFuelConsumption">Fuel Consumption</label>
              <input type="number" class="form-control mt-1" id="vehicleFuelConsumption"
                     value="${vehicle.vehicleFuelConsumption}" readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
            <div class="form-group mt-1">
              <label for="vehicleIsHybrid">Vehicle is Hybrid</label>
              <input type="number" class="form-control mt-1" id="vehicleIsHybrid" value="${vehicle.vehicleIsHybrid}" readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-12 mt-4 ">
            <div class="form-group">
              <label for="vehicleNoOfSeats">No of Vehicle Seats (excluding driver)</label>
              <input type="number" class="form-control mt-1" id="vehicleNoOfSeats" value="${vehicle.vehicleNoOfSeats}"
                     readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-12 mt-4 ">
            <div class="form-group">
              <label for="vehicleFeeForOneDay100km">feeForOneDay100km</label>
              <input type="number" class="form-control mt-1" id="vehicleFeeForOneDay100km"
                    value="${vehicle.vehicleNoOfSeats}"
                     value="0" readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-12 mt-4 ">
            <div class="form-group">
              <label for="vehicleFeeForExtra1km">vehicleFeeForExtra1km</label>
              <input type="number" class="form-control mt-1" id="vehicleFeeForExtra1km" value="${vehicle.feeForExtra1km}"
                     value="0" readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
            <div class="form-group mt-1">
              <label for="vehicleType">Vehicle Type</label>
              <input type="text" class="form-control mt-1" id="vehicleType" value="${vehicle.vehicleType}"
                     readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
            <div class="form-group mt-1">
              <label for="vehicleTransmission">Vehicle Transmission</label>
              <input type="text" class="form-control mt-1" id="vehicleTransmission" value="${vehicle.vehicleTransmission}"
                     readonly>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-12 mt-4 ">
            <div class="form-group">
              <label for="vehicleRemarks">Vehicle Remarks</label>
              <input type="text" class="form-control mt-1" id="vehicleRemarks" value="${vehicle.vehicleRemarks}"
                     readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 mt-4 ">
            <div class="form-group">
              <label for="vehicleDriverName">Vehicle Driver Name</label>
              <input type="text" class="form-control mt-1" id="vehicleDriverName" value="${vehicle.vehicleDriverName}"
                     readonly>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12 mt-4 ">
            <div class="form-group">
              <label for="vehicleDriverContact">Vehicle Driver Contact</label>
              <input type="text" class="form-control mt-1" id="vehicleDriverContact" value="${vehicle.vehicleDriverContact}"
                     readonly>
            </div>
          </div>
          </div>
        </div>
            
        </div> `;
            innerHtml += hotelHtml;
        });
        $('#vehiclesContainer').html(innerHtml);
    }

}