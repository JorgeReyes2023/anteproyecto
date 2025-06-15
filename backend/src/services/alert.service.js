const { AlertModel } = require('../models/alert.model');

class AlertService {
    static async createAlert(alertData) {
        try {
        return await AlertModel.createAlert(alertData);
        } catch (error) {
        throw new Error(`Error creating alert: ${error.message}`);
        }
    }
    
    static async getAlertById(id) {
        try {
        return await AlertModel.getAlertById(id);
        } catch (error) {
        throw new Error(`Error fetching alert by ID: ${error.message}`);
        }
    }
    
    static async getAllAlerts() {
        try {
        return await AlertModel.getAllAlerts();
        } catch (error) {
        throw new Error(`Error fetching all alerts: ${error.message}`);
        }
    }
    
    static async updateAlert(id, alertData) {
        try {
        return await AlertModel.updateAlert(id, alertData);
        } catch (error) {
        throw new Error(`Error updating alert: ${error.message}`);
        }
    }
    
    static async deleteAlert(id) {
        try {
        return await AlertModel.deleteAlert(id);
        } catch (error) {
        throw new Error(`Error deleting alert: ${error.message}`);
        }
    }
}

module.exports = { AlertService };