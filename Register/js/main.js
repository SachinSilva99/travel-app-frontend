/*
import {UserDTO} from "../model/UserDto.js";

$('#submitBtn').click((e)=> {
    e.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();
    const dob = $('#birthday').val();
    const selectedGender = $("input[name='gender']:checked").val();
    if (selectedGender) {
        alert("Selected gender: " + selectedGender);
    } else {
        alert("Please select a gender.");
    }
    const address = $('#address').val();
    const remarks = $('#remarks').val();
    const email = $('#email').val();
    const phoneNumber = $('#phone').val();
    const nicOrPassportNumber = $('#nicOrPassportNumber').val();
    const profilePicture = $('#profile_image').val();
    const nicOrPassportImgFront = $('#nic_or_passport_img_front').val();
    const nicOrPassportImgBack = $('#nic_or_passport_img_back').val();

    const userDto = new UserDTO(
        username,
        password,
        email,
        nicOrPassportNumber,
        address,
        phoneNumber,
        profilePicture,
        nicOrPassportImgFront,
        nicOrPassportImgBack,
        selectedGender,
        remarks,
        dob);
    console.log(userDto)
});*/
