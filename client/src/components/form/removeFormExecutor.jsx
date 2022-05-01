import React, { useState } from "react";
import MultiSelectField from "./multiSelectField";
import "./removeFormExecutor.scss";
import PropTypes from "prop-types";
// import { useAddData } from "../hooks/useAddDocData";
import { useDispatch, useSelector } from "react-redux";
import { getExecutor } from "../store/executor";
import { updateDocData } from "../store/docData";
// import { useDispatch } from "react-redux";
// import { loadDocDataList } from "../store/docData";
//
// import { useDocData } from "../hooks/useDocData";

//
const RemoveFormExecutor = ({ stateDispaly, setStateDispaly, selectData }) => {
    const [data, setData] = useState({
        inWork: []
    });
    const dispatch = useDispatch();
// useEffect(() => {}, [data]);
    const executor = useSelector(getExecutor());
    // const docData = useSelector(getDocData());
    // const { updateData } = useAddData();
    // const { getData } = useDocData();
    // const dispatch = useDispatch();

    const handleChange = (target) => {
        // console.log(target);
        setData((prevstate) => ({
            ...prevstate,
            [target.name]: target.value
        }));
    };
    // console.log(selectData);
    const executorList = executor.map((q) => ({
        label: q.name,
        value: q._id
    }));

    function search(arrOne, arrTwo) {
        const result = [];
        arrOne.forEach(function (elem) {
            if (arrTwo.indexOf(elem) === -1) {
                result.push(elem);
            }
        });
        return result;
    }

    function search2(arrOne, arrTwo) {
        const arr = [];
        for (const key of arrOne) {
            for (const el of arrTwo) {
                if (key._id.indexOf(el) !== -1) {
                    arr.push(key);
                    break;
                }
            }
        }
        const executorList = arr.map((q) => ({
            label: q.name,
            value: q._id
        }));
        return executorList;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const newInWork = data.inWork.map((q) => q.value);
            const inWork = search(selectData.inWork, newInWork);
            // const newData = ;
            // updateData(newData);
            dispatch(
                updateDocData({
                    ...selectData,
                    inWork
                })
                );
                // dispatch(loadDocDataList());
                // console.log(docData);
                                // dispatch(loadDocDataList());
                // dispatch(getDocData());
            // useEffect(() => {
            //     dispatch(loadDocDataList());
            // }, []);
            // getData();
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
    };
    const hiddenPopap = () => {
        setStateDispaly("hidden");
        //
        // console.log(data);
    };

    return (
        <>
            <div className={`removeExecutorStyle ${stateDispaly}`}>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column align-items-center"
                >
                    <div className="d-flex ">
                        <div className="selectContainer">
                            <MultiSelectField
                                options={
                                    selectData
                                        ? search2(executor, selectData.inWork)
                                        : executorList
                                }
                                onChange={handleChange}
                                name="inWork"
                                label="Снять с контроля"
                            />
                        </div>
                    </div>
                    <button onClick={hiddenPopap} className={`btn btn-light `}>
                        Сохранить
                    </button>
                </form>
                <button className=" btn hover closeModal" onClick={hiddenPopap}>
                    &times;
                </button>
            </div>
        </>
    );
};

RemoveFormExecutor.propTypes = {
    stateDispaly: PropTypes.string,
    setStateDispaly: PropTypes.func,
    selectData: PropTypes.object
};
export default RemoveFormExecutor;
