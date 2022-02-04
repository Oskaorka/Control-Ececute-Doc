import httpService from "./httpService";

const loginEndPoint = "docData/";

const loginService = {
    get: async () => {
        const { data } = await httpService.get(loginEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            loginEndPoint + payload._id,
            payload
        );
        console.log(data);
        return data;
    }
};

export default loginService;
