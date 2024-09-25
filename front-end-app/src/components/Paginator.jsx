const Paginator = (props) => {
    const itemsPerPage = 15;

    const handleNext = () => {
        if (props.page < Math.ceil(props.count / itemsPerPage)) {
            props.handlePageChange(props.page + 1);
        }
    };

    const handleBack = () => {
        if (props.page > 1) {
            props.handlePageChange(props.page - 1);
        }
    };

    return (
        <>
            <div data-testid="paginator" className="flex gap-2 items-center">
                <button data-testid="backButton" disabled={props.page == 1} onClick={handleBack} className="cursor-pointer bg-blue-400 ring-1 ring-blue-300 shadow-md transition-colors hover:bg-blue-500 text-xs px-4 h-8 rounded-lg">Back</button>
                <p data-testid="pageDisplay" className=" shadow-md ring-1 ring-gray-300 text-slate-700 text-sm font-bold flex items-center justify-center w-10  h-8 rounded-lg">{props.page}</p>
                <button data-testid="nextButton" onClick={handleNext} className="bg-blue-400 ring-1 ring-blue-300 shadow-md transition-colors hover:bg-blue-500 text-xs px-4 h-8 rounded-lg">Next</button>
            </div>
        </>
    )
}

export default Paginator;