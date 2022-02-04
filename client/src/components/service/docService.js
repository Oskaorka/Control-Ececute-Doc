import httpService from "./httpService";

const docDataEndPoint = "docData/";

const docDataService = {
    get: async () => {
        const { data } = await httpService.get(docDataEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            docDataEndPoint + payload.id,
            payload
        );
        return data;
    }
};

export default docDataService;
