import { SimpleUser } from './simple-user';
export class Activities {
    data:{
        activities:[{
            name: string,
            projectManager: SimpleUser,
            description: string,
            color_code: string,
            users: [SimpleUser],
            a_type: {
                name: string,
                id: number
            }
        }]
    }
}
