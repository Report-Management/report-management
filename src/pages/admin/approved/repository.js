import {BaseRepository} from "../../../core/index.js";


export class ApprovedReportRepository extends BaseRepository {
    constructor() {
        super("report");
    }

    async getReportApproved() {
        const response = await this.get("/show/approve")
        const data = await this.checkError(response)
        const list_report = []
        if (data !== null) {
            data.forEach((report) => {
                list_report.push({
                    id: report.id,
                    category: report.category,
                    priority: report.priority,
                    header: report.header,
                    information: report.information,
                    approval: report.approval,
                    completed: report.completed,
                    view: report.view,
                    file: report.file,
                    time: report.time,
                    username: report.username,
                    profile: report.profile,
                    isLoading: false,
                })
            })
            return list_report
        }
        return null
    }


    async updateCompleted(id) {
        const response = await this.put(`/markCompleted?id=${id}`)
        const data = await this.checkError(response)
        return data != null;
    }

    async updateUnapproved(id) {
        const response = await this.put(`/unmarkApproved?id=${id}`)
        const data = await this.checkError(response)
        return data != null;
    }
}