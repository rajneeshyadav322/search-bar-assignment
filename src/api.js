import axios from "axios"

export const fetchUsers = async () => {
    try {
        const response = await axios('https://mocki.io/v1/a0f57a34-3afb-467e-94dd-b6fc5d2e28af')
        return response;
    }
    catch (e) {
        return { error: e }
    }
}