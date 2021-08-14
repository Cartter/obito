const osu = require('node-osu');

const osuApi = new osu.Api("2c876c279dcfa1f96de6b1105c374a1ba08976d7", {
    notFoundAsError: true,
    completeScores: false,
    parseNumeric: false
})


module.exports = class osu {
    static async getUser(user, mode) {
        return osuApi.apiCall('/get_user', { u: user, m: mode }).then(u => u[0])
    }
    static async getBeatmapScoreFromPlayer(beatmap, userId) {
        return osuApi.apiCall('/get_scores', { b: beatmap, u: userId, limit: '1', type: 'id' })
    }

    static async getUserTopScores(user, mode, limit) {
        return osuApi.apiCall('/get_user_best', { u: user, m: mode, limit })
    }

    static async getUserRecentPlays(user, mode, limit) {
        return osuApi.apiCall('/get_user_recent', { u: user, m: mode, limit }).then(u => u.filter(p => p.rank !== 'F'))
    }

    static async getScores(beatmap) {
        return osuApi.getScores({ b: beatmap }).then(s => s[0])
    }
}