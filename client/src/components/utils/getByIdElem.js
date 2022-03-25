const getById = (id, arr) => {
    const findElemById = arr.find((e) => {
        // console.log(e);
        // console.log(id);
        return e._id === id;
    });
    return findElemById.name;
};
export default getById;
