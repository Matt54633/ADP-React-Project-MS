const SortSelect = (props) => {

    const handleChange = (event) => {
        props.handleSortDirectionChange(event.target.value);
    };

    return (
        <>
            <select onChange={handleChange}
                className="shadow-md outline-none ring-1 ring-gray-300 bg-white text-slate-700 text-sm font-bold flex items-center justify-center   h-8 rounded-lg">
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </>
    )
}

export default SortSelect;