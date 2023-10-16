import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LaborantService from "../../services/LaborantService";
import Laborant from "./Laborant";

const LaborantList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [laborant, setLaborant] = useState(null);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await LaborantService.getLaborants();
        setLaborant(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect( () => {
    if(nav) {
        navigate("/report/all")
    }
    setNav(false);
  })

  const handleNavigate = () => {
    setNav(true);
  };

  return (
    <div className="container mx-auto my-4">
      <div className="flex justify-between">
        <div className="h-12">
          <button
            onClick={handleNavigate}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-opacity-0">
              Reports{" "}
            </span>
          </button>
        </div>
      </div>
      <div className="flex shadow border-b mt-3">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Hospital ID
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {laborant.map((laborant) => (
                <Laborant laborant={laborant} key={laborant.id}></Laborant>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default LaborantList;
