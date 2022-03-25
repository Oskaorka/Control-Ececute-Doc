import httpService from "./httpService";
import localStorageService from "./localStorageService";

const docDataEndPoint = "/docData/";

const docDataService = {
    get: async () => {
        const { data } = await httpService.get(docDataEndPoint);
        return data;
    },
    create: async (payload) => {
        // console.log(payload);
        const data = await httpService.put(
            docDataEndPoint + payload._id,
            payload
        );
        console.log(data);
        return data;
    },
    update: async (payload) => {
        console.log(payload);
        const { data } = await httpService.patch(
            docDataEndPoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
};

export default docDataService;
