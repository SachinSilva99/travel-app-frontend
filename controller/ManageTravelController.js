export class ManageTravelController {
    constructor() {
        this.travelIds = [];
        this.getTravelsApiUrl = 'http://localhost:8000/travelservice/api/v1/gettravels';
        this.getAllTravelIds();
        this.travelIdSelectEl = $('#travelIdSelect');
        this.travelIdSelectEl.on('click', this.travelIdOnChange.bind(this));
    }
    travelIdOnChange(){
        const selectedTravelId = this.travelIdSelectEl.val();
        const selectedTravel = travelDetails.find(travel => travel.travelId === selectedTravelId);

        if (selectedTravel) {
            // Display travel details
            const travelDetailsDiv = document.getElementById("travelDetails");
            travelDetailsDiv.innerHTML = `
                    <p><strong>Travel ID:</strong> ${selectedTravel.travelId}</p>
                    <p><strong>Start Date:</strong> ${selectedTravel.startDate}</p>
                    <p><strong>End Date:</strong> ${selectedTravel.endDate}</p>
                    <p><strong>No. of Adults:</strong> ${selectedTravel.noOfAdults}</p>
                    <p><strong>No. of Children:</strong> ${selectedTravel.noOfChildren}</p>
                    <p><strong>Total Head Count:</strong> ${selectedTravel.totalHeadCount}</p>
                    <p><strong>Is With Pets:</strong> ${selectedTravel.isWithPets}</p>
                    <p><strong>Is With Guide:</strong> ${selectedTravel.isWithGuide}</p>
                    <p><strong>Is Cancelled:</strong> ${selectedTravel.isCancelled}</p>
                    <p><strong>Travel Total Price:</strong> ${selectedTravel.travelTotalPrice}</p>
                    <p><strong>Travel Placed Date:</strong> ${selectedTravel.travelPlacedDate}</p>
                    <p><strong>Bank Slip Image:</strong> ${selectedTravel.bankSlipImg}</p>
                    <p><strong>Package Category:</strong> ${selectedTravel.packageCategory}</p>
                `;

            // Display hotel stay details in the table
            const hotelStayTableBody = document.querySelector("#hotelStayTable tbody");
            hotelStayTableBody.innerHTML = "";
            selectedTravel.hotelStayDtos.forEach(hotelStay => {
                hotelStayTableBody.innerHTML += `
                        <tr>
                            <td>${hotelStay.hotelStayOrderNumber}</td>
                            <td>${hotelStay.hotelStayStartDate}</td>
                            <td>${hotelStay.hotelStayEndDate}</td>
                            <td>${hotelStay.hotelStayTotalCost}</td>
                            <td>${hotelStay.hotelStayHotelId}</td>
                            <td>${hotelStay.hotelStayHotelPackageId}</td>
                        </tr>
                    `;
            });
        } else {
            // Clear the travel details and hotel stay table if no travel is selected
            document.getElementById("travelDetails").innerHTML = "";
            document.querySelector("#hotelStayTable tbody").innerHTML = "";
        }
    }
    getAllTravelIds() {
        console.log(localStorage.getItem('registeredCustomerAccessToken'))
        $.ajax({
            type: "GET",
            url: this.getTravelsApiUrl,
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('registeredCustomerAccessToken')}`
            },
            success: (response) => {
                console.log("Travel saved successfully. Travel ID: " + response.data);
                response.data.forEach(travel => {
                    this.travelIds.push(travel.travelId);
                });
                this.loadId();
            },
            error: (error) => {
                console.error("Error saving guide: " + error.responseText);
            }
        });
    }

    loadId() {
        this.travelIds.forEach(travelId => {
            this.travelIdSelectEl.append($("<option>", {
                value: travelId,
                text: travelId
            }));
        });
    }
}