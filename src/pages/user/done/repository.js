import {BaseRepository} from "../../../core/index.js";

export class DoneReportRepository extends BaseRepository {
    constructor() {
        super('report');
    }

    async getApprovedReport() {
        const response = await this.get('/showCompletedReport');
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
                    completed: report.completed,
                    view: report.view,
                    file: report.file,
                    time: report.time,
                    username: report.username,
                    profile: report.profile,
                })
            })
            return list_report
        }
        return null
    }
}