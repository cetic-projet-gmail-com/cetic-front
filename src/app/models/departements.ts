export interface Departements {
    links:{
        current:string,
        next:string,
        previous:string,
        first:string,
        last:string
    }
    data: {
        departement: [{
            id: number,
            name: string,
            responsible_id: number
        }]
    }
}

