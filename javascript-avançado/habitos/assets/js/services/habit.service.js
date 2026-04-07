angular.module('app').service('HabitService', function() {
    const habits = [];

    function normalizeName(name) {
        return String(name || '').trim().toLowerCase();
    }

    function findHabitIndexById(id) {
        return habits.findIndex(function(habit) {
            return habit.id === Number(id);
        });
    }

    function findHabitById(id) {
        return habits.find(function(habit) {
            return habit.id === Number(id);
        }) || null;
    }

    function habitNameAlreadyExists(name, ignoreId = null) {
        const normalizedName = normalizeName(name);

        return habits.some(function(habit) {
            if (ignoreId !== null && habit.id === ignoreId) {
                return false;
            }

            return normalizeName(habit.name) === normalizedName;
        });
    }

    this.getAll = function() {
        return habits;
    };

    this.getById = function(id) {
        return findHabitById(id);
    };

    this.create = function(name) {
        if (habitNameAlreadyExists(name)) {
            throw new Error('Habit already exists');
        }

        const habit = new Habit();
        habit.name = name;
        habit.active = true;

        habits.push(habit);

        return habit;
    };

    this.remove = function(id) {
        const habitIndex = findHabitIndexById(id);

        if (habitIndex === -1) {
            throw new Error('Habit not found');
        }

        habits.splice(habitIndex, 1);
    };

    this.rename = function(id, newName) {
        const habit = findHabitById(id);

        if (!habit) {
            throw new Error('Habit not found');
        }

        if (habitNameAlreadyExists(newName, habit.id)) {
            throw new Error('Habit already exists');
        }

        habit.name = newName;

        return habit;
    };

    this.activate = function(id) {
        const habit = findHabitById(id);

        if (!habit) {
            throw new Error('Habit not found');
        }

        habit.active = true;

        return habit;
    };

    this.deactivate = function(id) {
        const habit = findHabitById(id);

        if (!habit) {
            throw new Error('Habit not found');
        }

        habit.active = false;

        return habit;
    };

    this.toggleStatus = function(id) {
        const habit = findHabitById(id);

        if (!habit) {
            throw new Error('Habit not found');
        }

        habit.active = !habit.active;

        return habit;
    };
});
