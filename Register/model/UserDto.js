export class UserDTO {
    constructor(username, password, email, nicPassportNumber, address, phoneNumber, profilePicture, nicPassportFrontImg, nicPassportBackImg, gender, remarks, dob) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.nicPassportNumber = nicPassportNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
        this.nicPassportFrontImg = nicPassportFrontImg;
        this.nicPassportBackImg = nicPassportBackImg;
        this.gender = gender;
        this.remarks = remarks;
        this.dob = dob;
    }
}

