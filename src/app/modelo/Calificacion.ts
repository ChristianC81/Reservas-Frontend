export class Calificacion {
    calId: number = 0;
    calvalor: number = 0;

    constructor(cal_id?: number, cal_valor?: number) {
        this.calId = cal_id || 0;
        this.calvalor = cal_valor || 0;
    }
}