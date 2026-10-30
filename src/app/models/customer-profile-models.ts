export interface Profile {
    email: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    photo: string | null | undefined;
    dateOfBirth: Date | null | undefined;
}

export enum ProfileProperties {
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    EMAIL = "email",
    PHOTO = "photo",
    DATE_OF_BIRTH = "date_of_birth"
}

export interface PatchableProfile {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
}
