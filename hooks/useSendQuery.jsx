import sendQuery from '../api/sendQuery'

export default function useSendQuery() {

    const sendQuestion = async (query) => {
        try {
            const res = await sendQuery(query);
            return res;
        } catch(e) {
            console.log("Error sending query:", e)
        }
    }

    return{
        sendQuestion,
    }
}