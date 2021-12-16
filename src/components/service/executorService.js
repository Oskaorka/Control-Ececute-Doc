import httpService from "./httpService";

const executorEndPoint = "executors/";

const executorService = {
    get: async () => {
        const { data } = await httpService.get(executorEndPoint);
        return data;
    }
};

export default executorService;
