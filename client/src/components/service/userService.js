import httpService from "./httpService";
// import localStorageService from "./localStorageService";

const userEndPoint = "/user/";
const adminEndPoint = "/administrator/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const data = await httpService.put(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    createAdmin: async (payload) => {
        const data = await httpService.put(
            adminEndPoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndPoint
        );
        // console.log(data);
        return data;
    },
    getCurrentAdmin: async () => {
        const { data } = await httpService.get(
            adminEndPoint
        );
        return data;
    }
};

export default userService;
