export class Users {
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
                firstname: string;
                lastname: string;
                email: string;
                password: string;
                role_id: number;
                departement_id: number;
            }
        ]
    }
}
