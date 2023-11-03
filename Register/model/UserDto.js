export class UserDTO {
    constructor(username, password, email, nicPassportNumber, address, phoneNumber, gender, remarks, dob,userType) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.nicPassportNumber = nicPassportNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.profilePicture = null;
        this.nicPassportFrontImg = null;
        this.nicPassportBackImg = null;
        this.gender = gender;
        this.remarks = remarks;
        this.dob = dob;
        this.userType = userType;
    }
}

