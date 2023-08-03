export class AppError extends Error {
    status:number=500
    constructor(st:number,message:string | any){
        super(message)

        this.status=st
    }
}