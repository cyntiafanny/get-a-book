import axios from "axios";

export const submitKeyword = (keyword: string) => {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`);
};