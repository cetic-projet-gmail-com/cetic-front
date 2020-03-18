export interface Departements {
    departments: [
        {
          id: number,
          name: string,
          responsibleId: number,
          createdAt: string,
          updatedAt: string,
          responsible: {
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
          }
        }
      ]
}
