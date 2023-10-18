import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LaborantService from "../../services/LaborantService";
import Laborant from "./Laborant";

const LaborantList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [laborant, setLaborant] = useState(null);
  const [nav, setNav] = useState(false);
  const [addLab, setAddLab] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (nav) {
        navigate("/report/all");
      }
      if (addLab) {
        navigate("/laborant/add")
      }
      setNav(false);
      setLoading(true);
      setAddLab(false);
      try {
        const response = await LaborantService.getLaborants();
        setLaborant(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [nav, navigate,addLab]);

  return (
    <div className="container mx-auto my-4">
      <div className="flex justify-between">
        <div className="h-12">
          <button
            onClick={setNav}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Reports{" "}
          </button>
          <button
            onClick={setAddLab}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          >
            Add Laborant{" "}
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
          {laborant && !loading ? (
            <tbody className="bg-white">
              {laborant.map((laborant) => (
                <Laborant laborant={laborant} key={laborant.id}></Laborant>
              ))}
            </tbody>
          ) : (
            <p> No laborants to display.</p>
          )}
        </table>
      </div>
    </div>
  );
};

export default LaborantList;
