export class Tasks {
    tasks: [{
        id: number,
        name: string,
        description: string,
        activityId: number,
        createdAt: string,
        updatedAt: string,
        ended: false,
        activity: {
            id: number,
            name: string,
            description: string,
            projectManagerId: number,
            createdAt: string,
            updatedAt: string,
            colourId: number,
            aTypeId: number,
            ended: boolean
        }
    }]
}
