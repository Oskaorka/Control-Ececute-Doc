import axios from "axios";
import configFile from "../../configFile.json";
import { toast } from "react-toastify";
// const t = (axios.defaults.baseURL = t);
const http = axios.create({
    baseURL: configFile.apiPath
});
// console.log(http);
// http.get(t + "executors" + ".json").then((resp) => setExecutor(resp.data));
http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    // console.log(data);
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : [];
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            // toast.info("Somthing was wron. Try it latter");
            toast.error("Unexpected error или злая ошибка");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
export default httpService;
