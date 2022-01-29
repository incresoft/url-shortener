const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%"

export function createToken() {
    let first = "";
    let second = "";
    let third = "";

    for (let i = 0; i < 9; i++) {
        first += chars[Math.floor(Math.random() * chars.length)];
    };

    for (let i = 0; i < 9; i++) {
        second += chars[Math.floor(Math.random() * chars.length)];
    };

    for (let i = 0; i < 9; i++) {
        third += chars[Math.floor(Math.random() * chars.length)];
    };

    return first + "." + second + "." + third;
};

export function generatePassword () {
    let password = "";

    for (let i = 0; i < 17; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    };

    return password;
};