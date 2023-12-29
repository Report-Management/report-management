import {BaseRepository} from "../../../core/index.js";


export class DashboardRepository extends BaseRepository {
    constructor() {
        super("dashboard");
    }

    async getReportMonth(year) {
        const response = await this.get("/month?year="+year)
        return await this.checkError(response)
    }

    async getReportYear() {
        const response = await this.get("/year")
        return await this.checkError(response)
    }
    
    async getReportCategoryYear(year) {
        const response = await this.get("/category?year="+year)
        return await this.checkError(response)
    }

    async getReportCategoryAll() {
        const response = await this.get("/category/all")
        return await this.checkError(response)
    }

    async getReportSolve(year, month) {
        const response = await this.get("/solve?year="+year+"&month="+month)
        return await this.checkError(response)
    }

    async getReportSpam(year, month) {
        const response = await this.get("/spam?year="+year+"&month="+month)
        return await this.checkError(response)
    }

    async getReportDetail() {
        const response = await this.get("/detail")
        return await this.checkError(response)
    }

    async getDate() {
        const response = await this.get("/date")
        return await this.checkError(response)
    }

}