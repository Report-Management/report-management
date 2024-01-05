import {BaseRepository} from "../../../core/index.js";

export class CreateReportRepository extends BaseRepository {
    constructor() {
        super('report');
    }

    async createReport(body) {
        const response = await this.post('/create_report', body);
        const data = await this.checkError(response);
        return data != null;
    }
}