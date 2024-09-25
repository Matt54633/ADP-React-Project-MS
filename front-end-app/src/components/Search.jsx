const Search = (props) => {
    return (
        <>
            <div className="flex items-center shadow-md ring-1 pl-3 transition-colors hover:bg-gray-100 bg-white ring-gray-300 rounded-lg w-1/3">
                <svg data-testid="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#262626" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <input type="search" onChange={(e) => props.handleSearchChange(e)} value={props.search} placeholder="Search" className="text-sm hover:outline-none active:outline-none outline-none bg-white hover:bg-gray-100 transition-colors text-right  text-slate-700  flex items-center justify-center w-full h-8 rounded-lg"></input>
            </div>
        </>
    )
}

export default Search;