const { ThresholdModel } = require('../models/threshold.model');

class ThresholdService {
    static async createThreshold(thresholdData) {
        return ThresholdModel.createThreshold(thresholdData);
    }

    static async getThresholdById(id) {
        return ThresholdModel.getThresholdById(id);
    }

    static async getAllThresholds() {
        return ThresholdModel.getAllThresholds();
    }

    static async updateThreshold(id, thresholdData) {
        return ThresholdModel.updateThreshold(id, thresholdData);
    }

    static async deleteThreshold(id) {
        return ThresholdModel.deleteThreshold(id);
    }
}
module.exports = { ThresholdService };