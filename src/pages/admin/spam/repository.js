import {BaseRepository} from "../../../core/index.js";


export class SpamReportRepository extends BaseRepository {
    constructor() {
        super("report");
    }

    async getSpamReportCompleted() {
        const response = await this.get("/showSpamReport")
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
                    spam: report.spam,
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


    async updateHam(id) {
        const response = await this.put(`/unmarkSpam?id=${id}`)
        const data = await this.checkError(response)
        return data != null;
    }
}