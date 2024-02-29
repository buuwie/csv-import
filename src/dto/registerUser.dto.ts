import { IsNotEmpty, Matches, MinLength, MaxLength } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @MinLength(6) @MaxLength(12)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Password must contains at least a uppercase letter, a lowercase letter and a number"
    })
    password: string;
}