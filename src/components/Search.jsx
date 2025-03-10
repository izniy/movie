import React from 'react'

const Search = ( { searchTerm, setSearchTerm }) => {
    // props should never be changed by the child component
    // they are read only
    // e.g. searchTerm = 'I AM BATMAN';
    // mutates the prop in multiple places!
    // main rules of react: you should never mutate props and states
    // you only mutate a state using the setter function
    return (
        <div className="flex flex-col items-center justify-center w-full mt-6">
            <div className="relative flex items-center w-full max-w-lg">
                <img src="/search-bar.svg" alt="search-bar" className="absolute left-4 w-6 h-6" />
                <input
                    type="text"
                    placeholder="Search through 300+ movies online"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 text-white text-lg rounded-lg py-3 pl-12 pr-4 outline-none border border-gray-700 focus:border-purple-500"
                />
            </div>
        </div>
    );
};
export default Search
