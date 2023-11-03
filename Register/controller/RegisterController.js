import {UserDTO} from "../model/UserDto.js";

export class RegisterController {
    constructor() {
        this.usernameEl = $('#username');
        this.passwordEl = $('#password');
        this.dobEl = $('#birthday');
        this.selectedGenderEl = $("input[name='gender']:checked");
        this.addressEl = $('#address');
        this.remarksEl = $('#remarks');
        this.emailEl = $('#email');
        this.phoneNumberEl = $('#phone');
        this.nicOrPassportNumberEl = $('#nicOrPassportNumber');
        this.profilePictureEl = $('#profile_image');
        this.nicOrPassportImgFrontEl = $('#nic_or_passport_img_front');
        this.nicOrPassportImgBackEl = $('#nic_or_passport_img_back');
        $('#submitBtn').on('click', this.register.bind(this));
    }

    register(e) {
        e.preventDefault();
        if (this.selectedGenderEl) {
            alert("Selected gender: " + this.selectedGenderEl);
        } else {
            alert("Please select a gender.");
        }
        const username = this.usernameEl.val();
        const password = this.passwordEl.val();
        const email = this.emailEl.val();
        const nicOrPassportNumber = this.nicOrPassportNumberEl.val();
        const address = this.addressEl.val();
        const phoneNumber = this.phoneNumberEl.val();
        const profilePicture = this.profilePictureEl[0].files[0];
        const nicOrPassportImgFront = this.nicOrPassportImgFrontEl[0].files[0];
        const nicOrPassportImgBack = this.nicOrPassportImgBackEl[0].files[0];
        const selectedGender = this.selectedGenderEl.val();
        const remarks = this.remarksEl.val();
        const dob = this.dobEl.val();

        const userDto = new UserDTO(
            username,
            password,
            email,
            nicOrPassportNumber,
            address,
            phoneNumber,
            selectedGender,
            remarks,
            dob,
            'REGISTERED_USER');
        console.log(userDto);
        const formData = new FormData();
        const jsonDTO = JSON.stringify(userDto);
        const blob = new Blob([jsonDTO], {type: 'application/json'});

        formData.set("userDTO", blob);
        formData.set("profilePicture", profilePicture);
        formData.set("nicPassportFrontImg", nicOrPassportImgFront);
        formData.set("nicPassportBackImg", nicOrPassportImgBack);
        $.ajax({
            type: "POST",
            url: 'http://localhost:8090/userservice/api/v1/auth/register',
            data: formData,
            processData: false,
            contentType: false,
            success: (response) => {
                console.log("Customer registered successfully. User ID: " + response.data);
            },
            error: (error) => {
                console.error("Error registering customer: " + error.responseText);
            }
        });
    }
}