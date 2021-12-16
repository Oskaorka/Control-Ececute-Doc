import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
    itemsCount,
    pageSize,
    onPageChange,
    currentPage,
    nextPage,
    prevPage
}) => {
    const gridCenter = {
        gridColumnStart: 2
    };

    const pageCount = Math.ceil(itemsCount / pageSize);
    // console.log(pageCount);
    const pages = _.range(1, pageCount + 1);
    return (
        <>
            {pageCount > 1 ? (
                <nav
                    aria-label="d-flex Page navigation example"
                    style={gridCenter}
                >
                    <ul className="pagination justify-content-center">
                        <li
                            className={
                                "page-item " +
                                (currentPage === 1 ? "disabled" : "")
                            }
                        >
                            <a className="page-link" onClick={prevPage}>
                                Предыдущая
                            </a>
                        </li>
                        {/* &nbsp; */}
                        {pages.map((page) => (
                            <li
                                key={page}
                                className="page-item "
                                //   className={
                                //     // "page-item " +
                                //     page === currentPage ? "badge bg-secondary" : ""
                                //   }
                            >
                                <a
                                    className={
                                        "page-link " +
                                        (page === currentPage
                                            ? "bg-secondary"
                                            : "")
                                    }
                                    onClick={() => onPageChange(page)}
                                    style={{ color: "red" }}
                                >
                                    {page}
                                </a>
                            </li>
                        ))}
                        {/* &nbsp; */}
                        <li
                            className={
                                "page-item " +
                                (currentPage === pageCount ? "disabled" : "")
                            }
                        >
                            <a
                                className="page-link "
                                href="#"
                                onClick={nextPage}
                            >
                                Следующая
                            </a>
                        </li>
                    </ul>
                </nav>
            ) : null}
        </>
    );
};
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired
};
export default Pagination;
