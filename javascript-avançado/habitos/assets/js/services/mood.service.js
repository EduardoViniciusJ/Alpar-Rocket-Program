angular.module('app').service('MoodService', function() {
    const MOOD_OPTIONS = [
        { value: 1, label: 'Muito triste', emoji: '😢' },
        { value: 2, label: 'Neutro', emoji: '😐' },
        { value: 3, label: 'Feliz', emoji: '🙂' },
        { value: 4, label: 'Muito feliz', emoji: '🤩' }
    ];

    this.getMoodLabel = function(moodLevel) {
        const mood = MOOD_OPTIONS.find(function(option) {
            return option.value === Number(moodLevel);
        });
        return mood ? mood.label : 'Não definido';
    };

    this.getMoodEmoji = function(moodLevel) {
        const mood = MOOD_OPTIONS.find(function(option) {
            return option.value === Number(moodLevel);
        });
        return mood ? mood.emoji : '💭';
    };

    this.getMoodOptions = function() {
        return MOOD_OPTIONS;
    };
});
