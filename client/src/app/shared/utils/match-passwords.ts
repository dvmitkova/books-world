import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(
    passControlName: string, 
    repassControlName: string
    ): ValidatorFn {
    return (control) => {
        const passFormControl = control.get(passControlName);
        const repassFormControl = control.get(repassControlName);
        const areMatching = passFormControl?.value == repassFormControl?.value;

        // console.log({areMatching});
        
        
        return areMatching ? null : { matchPasswordsValidator: true };
    }
}