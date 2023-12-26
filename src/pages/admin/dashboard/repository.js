import {BaseRepository} from "../../../core/index.js";


export class DashboardRepository extends BaseRepository {
    constructor() {
        super("dashboard");
    }

    async getReportMonth() {
        const response = await this.get("/month?year=2023")
        return await this.checkError(response)
    }
    
    async getReportCategoryYear() {
        const response = await this.get("/category?year=2023")
        return await this.checkError(response)
    }

    async getReportSolve() {
        const response = await this.get("/solve")
        return await this.checkError(response)
    }

    async getReportSpam() {
        const response = await this.get("/spam")
        return await this.checkError(response)
    }

    async getReportDetail() {
        const response = await this.get("/detail")
        return await this.checkError(response)
    }

}