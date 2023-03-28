import axios from 'axios';

const getBucketNames = async () => {
    return await axios.get(`${process.env.REACT_APP_API}`);
}
export default getBucketNames;

export const getBucketCards = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}/${id}`);
}

export const addbucket = async (title , cards) => {
    return await axios.post(`${process.env.REACT_APP_API}` , {title , cards});
}

export const updateBucket = async (id , title , cards) => {
    return await axios.put(`${process.env.REACT_APP_API}/${id}` , {title , cards});
}

export const addCard = async (id , cards , title) => {
    return await axios.put(`${process.env.REACT_APP_API}/${id}` , {title , cards});
}

// history

export const getHistoryNames = async () => {
    return await axios.get(`${process.env.REACT_APP_API_HISTORY}`);
}

export const addHistory = async (id , name , link , time) => {
    return await axios.post(`${process.env.REACT_APP_API_HISTORY}` , {id , name , link , time});
}