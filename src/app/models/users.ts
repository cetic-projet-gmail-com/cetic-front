export interface Users {
    links: {
        current: string,
        next: string,
        previous: string,
        first: string,
        last: string
    },
    users: {
        users: [
            {
                id: number,
                login: string,
                firstName: string,
                lastName: string,
                departmentId: number,
                createdAt: string,
                updatedAt: string,
                roleId: number,
                email: string,
                password: string,
                role: {
                    id: number,
                    name: string
                },
                department: {
                    id: number,
                    name: string,
                    responsibleId: number,
                    createdAt: string,
                    updatedAt: string
                }
            }
        ]
    }
}