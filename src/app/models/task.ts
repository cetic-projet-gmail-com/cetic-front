export class Task {
    task: {
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
        },
        events: [
            {
                id: number,
                userId: number,
                taskId: number,
                description: string,
                createdAt: string,
                updatedAt: string,
                startAt: string,
                endAt: string
            }
        ]
    }
}