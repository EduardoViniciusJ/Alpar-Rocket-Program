angular.module('app').service('AuthService', function() {
    const USERS_STORAGE_KEY = 'todoflow.users';
    const SESSION_STORAGE_KEY = 'todoflow.sessionEmail';
    const users = [];
    let currentSessionEmail = '';

    function saveUsers() {
        const serializedUsers = users.map(function(user) {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password
            };
        });
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(serializedUsers));
    }

    function saveSession() {
        if (!currentSessionEmail) {
            localStorage.removeItem(SESSION_STORAGE_KEY);
            return;
        }
        localStorage.setItem(SESSION_STORAGE_KEY, currentSessionEmail);
    }

    function findUserByEmail(email) {
        const normalizedEmail = String(email || '').trim().toLowerCase();
        return users.find(function(user) {
            return user.email === normalizedEmail;
        }) || null;
    }

    function parseUser(rawUser) {
        const user = new User();
        user.id = rawUser.id;
        user.username = rawUser.username;
        user.email = rawUser.email;
        user.password = rawUser.password;
        return user;
    }

    function loadFromStorage() {
        const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);
        const rawSession = localStorage.getItem(SESSION_STORAGE_KEY);

        if (rawUsers) {
            try {
                const parsedUsers = JSON.parse(rawUsers);
                if (Array.isArray(parsedUsers)) {
                    parsedUsers.forEach(function(item) {
                        users.push(parseUser(item));
                    });
                }
            } catch (error) {
                localStorage.removeItem(USERS_STORAGE_KEY);
            }
        }

        currentSessionEmail = String(rawSession || '').trim().toLowerCase();
        if (currentSessionEmail && !findUserByEmail(currentSessionEmail)) {
            currentSessionEmail = '';
            saveSession();
        }
    }

    this.register = function(data) {
        if (findUserByEmail(data.email)) {
            throw new Error('Já existe uma conta com este e-mail');
        }

        const user = new User();
        user.username = data.username;
        user.email = data.email;
        user.password = data.password;
        users.push(user);
        saveUsers();
        return user;
    };

    this.login = function(email, password) {
        const user = findUserByEmail(email);
        if (!user || user.password !== password) {
            throw new Error('E-mail ou senha inválidos');
        }

        currentSessionEmail = user.email;
        saveSession();
        return user;
    };

    this.logout = function() {
        currentSessionEmail = '';
        saveSession();
    };

    this.resetPassword = function(email, newPassword) {
        const user = findUserByEmail(email);
        if (!user) {
            throw new Error('E-mail não encontrado');
        }
        user.password = newPassword;
        saveUsers();
        return user;
    };

    this.getCurrentUser = function() {
        if (!currentSessionEmail) {
            return null;
        }
        return findUserByEmail(currentSessionEmail);
    };

    this.isAuthenticated = function() {
        return !!this.getCurrentUser();
    };

    loadFromStorage();
});
