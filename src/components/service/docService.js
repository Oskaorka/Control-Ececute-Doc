import httpService from "./httpService";

const docDataEndPoint = "docData/";

const docDataService = {
    get: async () => {
        const { data } = await httpService.get(docDataEndPoint);
        return data;
    }
};

export default docDataService;
