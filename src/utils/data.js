import { store } from "../redux/store"

const { getState } = store
const state = getState();
export const countries = [


    {
        value: 2,
        'shortName': 'UK',
        'fullName': 'United Kingdom',
    },
    {
        value: 3,
        'shortName': 'US',
        'fullName': 'United States',
    },
    {
        value: 4,
        'shortName': 'Ind',
        'fullName': 'India',
    }
]