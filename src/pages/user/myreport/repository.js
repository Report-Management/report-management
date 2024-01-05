import { BaseRepository } from "../../../core/index.js";

export class MyReportRepository extends BaseRepository {
    constructor() {
        super('report');
    }

    async getMyReport() {
        const response = await this.get('/showMyReport');
        const data = await this.checkError(response);
        const list_report = []
        if (data !== null) {
            data.forEach((report) => {
                list_report.push({
                    id: report.id,
                    category: report.category,
                    priority: report.priority,
                    header: report.header,
                    information: report.information,
                    approved: report.approval,
                    view: report.view,
                    file: report.file,
                    time: report.time,
                    username: report.username,
                    profile: report.profile,
                })
            })
            return list_report
        }
        console.log(list_report)
        return null
    }

    async deletedReport(id) {
        const response = await this.delete(`/delete_report/${id}`);
        return await this.checkError(response);
    }


    async updateMyReport(id, body) {
        const response = await this.put(`/update/${id}`, body);
        return await this.checkError(response);
    }

    async updateReportFile(id, from) {
        const response = await this.put(`/updateFile/${id}`, from);
        return await this.checkError(response);
    }

    async removeReportFile(id) {
        const response = await this.delete(`deleted_report/${id}`);
        return await this.checkError(response);
    }
}