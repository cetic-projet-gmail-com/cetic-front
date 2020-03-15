export interface SimpleUser {
    
        data: {
          user: {
            id: number,
            login: string,
            firstName: string,
            lastName: string,
            email: string,
            password: string,
            createdAt: string,
            updatedAt: string,
            roleId: number,
            departmentId: number
          }
        }
      
}
