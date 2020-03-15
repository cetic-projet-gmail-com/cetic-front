export interface Users {
    links:{
        current:string,
        next:string,
        previous:string,
        first:string,
        last:string
    }
    data: {
        users: [
            {
                login: string;
                firstName: string;
                lastName: string;
                email: string;
                password: string;
                roleId: number;
                departmentId: number;
            }
        ]
    }
}
