import { useState } from "react";

const Home = () => {
  const [searchTerm , setSearchTerm] = useState();

  const handleSearchChange = () =>{

  }

    return (
      <>
        <div  className="flex flex-col h-screen bg-[#afafaf1a]/10 gap-4">

          <div className="flex flex-row p-1 justify-between ">
            <h1 className="text-3xl p-4">Dashboard</h1>
            <input
                      type="text"
                      placeholder="Search for anything ..."
                      value={searchTerm}
                      className="border p-1 rounded-lg shadow w-[450px] self-center h-[30px] mr-10"
                      onChange={handleSearchChange}
                    ></input>
          </div>

          <div className="flex flex-row justify-evenly items-center">
            <div className="w-[240px] h-[120px] bg-white shadow rounded-lg">Total</div>
            <div className="w-[240px] h-[120px] bg-white shadow rounded-lg">total</div>
            <div className="w-[240px] h-[120px] bg-white shadow rounded-lg">total</div>
            <div className="w-[240px] h-[120px] bg-white shadow rounded-lg">total</div>
          </div>

          <div className="flex flex-row justify-evenly items-center ">
            <div className="h-[300px] w-[700px] bg-white shadow rounded-lg p-1">
              Analitycs
            </div>
            <div className="h-[300px] w-[350px] bg-white shadow rounded-lg p-1">
              My Initiativs
            </div>
            </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-row w-[80em] h-[250px] bg-white shadow rounded-lg ">
              Transitions
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Home;
  