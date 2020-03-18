import { SimpleUser } from './simple-user';
export interface Activities {
    activities: [
        {
            id: number,
            name: string,
            description: string,
            projectManagerId: number,
            createdAt: string,
            updatedAt: string,
            colourId: number,
            aTypeId: number,
            ended: boolean,
            projectManager: {
                id: number,
                login: string,
                firstName: string,
                lastName: string,
                departmentId: number,
                createdAt: string,
                updatedAt: string,
                roleId: number,
                email: string,
                password: string
            },
            colour: {
                id: number,
                name: string,
                code: string
            },
            type: {
                id: 1,
                name: string
            }
        }
    ]
}
