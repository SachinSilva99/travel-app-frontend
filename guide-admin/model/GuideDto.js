export class GuideDTO {
    constructor(guideName, dob, gender, contact, guideExperience, guide_remarks,guideManDayValue) {
        this.guideId = null;
        this.guideName = guideName;
        this.dob = dob;
        this.gender = gender;
        this.contact = contact;
        this.guideProfileImage = null;
        this.guideIdImgFront = null;
        this.guideIdImgBack = null;
        this.guideExperience = guideExperience;
        this.guide_remarks = guide_remarks;
        this.guideManDayValue = guideManDayValue;
    }
}

