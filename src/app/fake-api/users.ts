import { User } from '../models/users';
export var usersDatas: User[] = [
    {
        id: 0,
        login: "Admin",
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@yopmail.com",
        roleId: 0,
        departmentId: 2,
        password: '123456'
    },
    {
        id: 1,
        login: "Moderator",
        firstName: "Lionel",
        lastName: "Laroche",
        email: "lionel.laroche@yopmail.com",
        roleId: 1,
        departmentId: 4,
        password: 'password'

    },
    {
        id: 2,
        login: "User",
        firstName: "Benjamin",
        lastName: "Lecomte",
        email: "benjamin.lecomte@yopmail.com",
        roleId: 3,
        departmentId: 1,
        password: 'benlecomte'
    },

]

