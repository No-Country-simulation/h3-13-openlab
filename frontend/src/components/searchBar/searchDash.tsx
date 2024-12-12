import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const SearchBar = () => {
  const { initiatives } = useSelector((state: RootState) => state.initiatives);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const navigate = useNavigate();


  const appPaths = [
    { name: "Dashboard", path: "/test" },
    { name: "Iniciativas", path: "/initiatives" },
    { name: "Mis Iniciativas", path: "/myInitiatives" },
    { name: "Perfil", path: "/profile" },
  ];

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      return;
    }


    const initiativeResults = initiatives.filter(
      (initiative: any) =>
        initiative.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        initiative.tokenDao?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const pathResults = appPaths.filter((path) =>
      path.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredResults([...initiativeResults, ...pathResults]);
  }, [searchTerm, initiatives]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (result: any) => {
    if (result.path) {

      navigate(result.path);
    } else if (result.id) {

      navigate(`/initiative/${result.id}`);
    }
  };

  return (
    <div className="relative p-2 text-black ">
      <input
        type="text"
        placeholder="Search for anything ..."
        value={searchTerm}
        className="border p-1 rounded-lg shadow lg:w-[30em] self-center h-[30px] mr-[15em] sm:w-[15em]"
        onChange={handleSearchChange}
      />
      {filteredResults.length > 0 && (
        <div className="absolute p-1 top-[35px] left-2 w-[30em] border bg-white rounded shadow-lg z-10">
          {filteredResults.map((result, index) => (
                        <button
                        key={index}
                        onClick={() => handleResultClick(result)}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          result.path ? "font-semibold" : "italic"
                        }`}
                      >
                        {result.name || result.token || "Sin nombre"}
                      </button>
          ))}
        </div>
      )}
      {searchTerm && filteredResults.length === 0 && (
        <div className="absolute top-[35px] left-0 w-[30em] bg-white rounded-lg shadow-lg px-4 py-2 text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
