export default class Cpf {
    CPF_VALID_LENGTH = 11;
    FACTOR_FIRST_VERIFY_DIGIT = 10;
    FACTOR_SECOND_VERIFY_DIGIT = 11;
    EXTRACT_DIGIT_POSITION = 9;

    value: string

    constructor(value: string) {
        if(!this.validate(value)) throw new Error('Invalid CPF')
        this.value = value
    }

    cleanCpf (cpf: string) {
        if (typeof cpf === 'number') return cpf
        return cpf.replace(/[^\d]+/g, '');
    }

    areAllDigitsEqual(cpf: string) {
        const [firstDigit] = cpf
        return [...cpf].every(c => c === firstDigit)
    }

    calculateDigit(cpf: string, factorVerify: number) {
        let total = 0
        let factor = factorVerify
        for (const digit of cpf) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const rest = total % this.FACTOR_SECOND_VERIFY_DIGIT;
        const result = rest === 0 ? 0 : this.FACTOR_SECOND_VERIFY_DIGIT - rest;
        return result;
    }

    extractVerifyDigit(cpf: string) {
        return cpf.slice(this.EXTRACT_DIGIT_POSITION)
    }

    validate(rawCpf: string | number) {
        if (!rawCpf) return false;
        const cpf = this.cleanCpf(`${rawCpf}`);
        if (!(cpf.length === this.CPF_VALID_LENGTH)) return false;
        if (this.areAllDigitsEqual(cpf)) return false;
        const firstVerifiedDigit = this.calculateDigit(cpf, this.FACTOR_FIRST_VERIFY_DIGIT);
        const secondVerifiedDigit = this.calculateDigit(cpf, this.FACTOR_SECOND_VERIFY_DIGIT);
        const verifiedDigit = this.extractVerifyDigit(cpf)
        const calculatedVefifiedDigit = `${firstVerifiedDigit}${secondVerifiedDigit}`;
        return calculatedVefifiedDigit === verifiedDigit;
    }
}