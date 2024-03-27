import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains: string[]): ValidatorFn {
    ///[A-Za-z0-9]+@gmail\.(com|bg)/gm
    const domainString = domains.join('|');
    const regExp = new RegExp(`[A-Za-z0-9]+@gmail\.(${domainString})`);


    return (control) => {
        const isEmailInvalid = control.value === '' || regExp.test(control.value);

        // console.log('Test Regex ', isEmailInvalid, 'controlValue: ', control.value);

        return isEmailInvalid ? null : { emailValidator: true };
    }
}