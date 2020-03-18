export interface SimpleActivity {
    activity: {
        id: number,
        name: string,
        description: string,
        projectManagerId: number,
        createdAt: string,
        updatedAt: string,
        colourId: number,
        aTypeId: number,
        ended: false,
        projectManager: {
          id: number,
          login: null,
          firstName: string,
          lastName: string,
          departmentId: number,
          createdAt: string,
          updatedAt: string,
          roleId: number,
          email: string
        },
        tasks: [
          {
            id: number,
            name: string,
            description: string,
            activityId: number,
            createdAt: string,
            updatedAt: string,
            ended: false
          }
        ],
        colour: {
          id: number,
          name: string,
          code: string
        },
        type: {
          id: number,
          name: string
        }
        users: [
          {
            id: 1,
            login: string,
            firstName: string,
            lastName: string,
            departmentId: number,
            createdAt: string,
            updatedAt: string,
            roleId: number,
            email: string,
            password: string,
            activitiesAssignment: {
              userId: number,
              activityId: number,
              createdAt: string,
              updatedAt: string
            }
          }
        ]
      }
}

