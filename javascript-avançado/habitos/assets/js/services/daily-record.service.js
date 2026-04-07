angular.module('app').service('DailyRecordService', function() {
    const dailyRecords = [];

    function getTodayDate() {
        return new Date().toISOString().split('T')[0];
    }

    function getOrCreateTodayRecord() {
        let dailyRecord = dailyRecords.find(function(record) {
            return record.date === getTodayDate();
        });

        if (!dailyRecord) {
            dailyRecord = new DailyRecord();
            dailyRecords.push(dailyRecord);
        }

        return dailyRecord;
    }

    this.getAll = function() {
        return dailyRecords;
    };

    this.getToday = function() {
        return dailyRecords.find(function(record) {
            return record.date === getTodayDate();
        }) || null;
    };

    this.saveToday = function(data = {}) {
        const dailyRecord = getOrCreateTodayRecord();

        if (typeof data.moodLevel !== 'undefined') {
            dailyRecord.moodLevel = data.moodLevel;
        }

        if (typeof data.note !== 'undefined') {
            dailyRecord.note = data.note;
        }

        if (Array.isArray(data.habits)) {
            dailyRecord.habits = data.habits.map(function(habit) {
                return {
                    id: habit.id,
                    name: habit.name,
                    completed: typeof habit.completed === 'boolean' ? habit.completed : false
                };
            });
        }

        return dailyRecord;
    };

    this.toggleHabit = function(habitId) {
        const dailyRecord = getOrCreateTodayRecord();

        const habit = dailyRecord.habits.find(function(item) {
            return item.id === Number(habitId);
        });

        if (!habit) {
            throw new Error('Habit not found');
        }

        habit.completed = !habit.completed;

        return dailyRecord;
    };
});
