import axios from 'axios';

const baseURL = (() => {
    return "https://www.ringleplus.com/api/v3/student/lesson_record/test"
})

export const http = axios.create({
    baseURL: baseURL(),
})

