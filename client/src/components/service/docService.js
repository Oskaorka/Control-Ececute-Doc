import httpService from "./httpService";
// import localStorageService from "./localStorageService";

const docDataEndPoint = "/docData/";
const docDataUpdateEndPoint = "/docData/updateDoc/";

const docDataService = {
    get: async () => {
        const { data } = await httpService.get(docDataEndPoint);
        // const { content } = data;
        // const filterData = data.content.filter(e => e.inWork.length > 0);
        // console.log(filterData);
        // return filterData;
        // console.log(filterData);
        return data;
    },
    create: async (payload) => {
        // console.log(payload);
        const { data } = await httpService.post(docDataEndPoint, payload);
        // console.log(data);
        return data;
    },
    update: async (payload) => {
        // console.log(payload);
        const { data } = await httpService.patch(docDataUpdateEndPoint, payload);
        return data;
    }
};

export default docDataService;
