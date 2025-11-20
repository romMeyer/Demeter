import { Role } from "../enum/Role";

export interface UserDto{
    name: string,
    firstname: string,
    lastname: string,
    roles: Role,
}