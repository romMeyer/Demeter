import { Role } from "../enum/Role";

export interface UserDto{
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    role: Role,
}