class User {
    static #lastId = 0;

    #id = null;
    #username = '';
    #email = '';
    #password = '';

    constructor() {
        User.#lastId++;
        this.#id = User.#lastId;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        const normalizedId = Number(id);
        if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
            throw new Error('Id deve ser um inteiro positivo');
        }
        this.#id = normalizedId;
        if (normalizedId > User.#lastId) {
            User.#lastId = normalizedId;
        }
    }

    get username() {
        return this.#username;
    }

    set username(username) {
        const normalizedUsername = String(username || '').trim();
        if (!normalizedUsername) {
            throw new Error('Username não pode estar vazio');
        }
        this.#username = normalizedUsername;
    }

    get email() {
        return this.#email;
    }

    set email(email) {
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            throw new Error('Email é inválido');
        }
        this.#email = normalizedEmail;
    }

    get password() {
        return this.#password;
    }

    set password(password) {
        const normalizedPassword = String(password || '');
        if (normalizedPassword.length < 4) {
            throw new Error('Senha deve ter pelo menos 4 caracteres');
        }
        this.#password = normalizedPassword;
    }

}

window.User = User;
