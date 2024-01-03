import {BaseRepository} from "../../../core/index.js";


export class ReportRepository extends BaseRepository {
    constructor() {
        super("report");
    }


    async getReport(param) {
        const response = await this.get("/show" + param)
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
                    view: report.view,
                    file: report.file,
                    time: report.time,
                    username: report.username,
                    profile: report.profile,
                    isLoading: false,
                    summaryText: null,
                    isSummaried: false,
                })
            })
            return list_report
        }
        return null
    }

    async onUpdateApproved(id) {
        const response = await this.put(`/markApproved?id=${id}`)
        const data = await this.checkError(response)
        return data !== null
    }

    async onUpdateUnApproved(id) {
        const response = await this.put(`/unmarkApproved?id=${id}`)
        const data = await this.checkError(response)
        return data !== null
    }

    async onGetSummary(id) {
        const response = await this.get(`/getSummary/${id}`)
        return await this.checkError(response);
    }

}