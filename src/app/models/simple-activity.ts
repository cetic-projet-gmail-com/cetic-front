import { SimpleUser } from './simple-user';
export class SimpleActivity {
    data: {
        activity: {
            name: string,
            projectManager: SimpleUser,
            description: string,
            color_code: string,
            users: [SimpleUser],
            a_type_id: number
        }
    }
}

