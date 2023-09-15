import { validateEmail } from '../../src/utils.js';
import { validatePassword } from '../../src/utils.js';
import { validatePasswordLength } from '../../src/utils.js';

describe('validateEmail', () => {
    test('should return an empty string for a valid email', () => {
        const validEmail = 'test@example.com';
        const result = validateEmail(validEmail);
        expect(result).toBe('');
    })
    test('should return an error message for an invalid email', () => {
        const invalidEmail = 'invalidemail';
        const result = validateEmail(invalidEmail);
        expect(result).toBe('Недопустимый адрес эл. почты');
    });
    
    test('should return an empty string for an empty email', () => {
        const emptyEmail = '';
        const result = validateEmail(emptyEmail);
        expect(result).toBe('');
    });
})

describe('validatePassword', () => {
    test('should return an empty string if the password is valid', () => {
        const password = 'password123';
        const confirmPassword = 'password123';
        const result = validatePassword(password, confirmPassword);
        expect(result).toBe('');
    });
    test('should return an error message if the password is less than 6 characters', () => {
        const password = 'pass';
        const confirmPassword = 'pass';
        const result = validatePassword(password, confirmPassword);
        expect(result).toBe('Пароль должен быть длиннее 6 символов');
    });
    test('should return an error message if the passwords do not match', () => {
        const password = 'password123';
        const confirmPassword = 'differentpassword';
        const result = validatePassword(password, confirmPassword);
        expect(result).toBe('Пароли не совпадают');
    });
    test('should return an empty string if the password and confirmPassword are empty', () => {
        const password = '';
        const confirmPassword = '';
        const result = validatePassword(password, confirmPassword);
        expect(result).toBe('');
    });
})

describe('validatePasswordLength', () => {
    test('should return an empty string if the password is valid', () => {
        const validPassword = 'password123';
        const result = validatePasswordLength(validPassword);
        expect(result).toBe('');
    });
    test('should return an error message if the password is less than 6 characters', () => {
        const shortPassword = 'pass';
        const result = validatePasswordLength(shortPassword);
        expect(result).toBe('Пароль должен быть длиннее 6 символов');
    });
    test('should return an empty string if the password is empty', () => {
        const emptyPassword = '';
        const result = validatePasswordLength(emptyPassword);
        expect(result).toBe('');
    });
})