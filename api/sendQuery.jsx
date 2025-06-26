import axios from "axios";
import { API_URL } from "../constants";

export default async function sendQuery(query) {
    const url = `${API_URL}/query`;
    const res = await axios.post(url, query)
    return res.data.payload
}