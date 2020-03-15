export interface Departements {
    links:{
        current:string,
        next:string,
        previous:string,
        first:string,
        last:string
    }
    data: {
        departments: [{
            id: number,
            name: string,
            responsibleId: number
        }]
    }
}

