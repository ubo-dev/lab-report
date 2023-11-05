import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LaborantService from "../../services/LaborantService";

export default function ViewLaborant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laborant, setLabort] = useState({
    id: id,
    firstName:"",
    lastName:"",
    hospitalId:""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LaborantService.getLaborantById(laborant.id);
        setLabort(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [laborant.id]);
  return (
    <div className="px-40 py-16">
      <div className="px-4 sm:px-0">
        <button
          onClick={() => navigate("/laborant/all")}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-700 rounded-md group-hover:bg-opacity-0">
            Back To Home{" "}
          </span>
        </button>
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Laborant Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and laborant details.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              First name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {laborant.firstName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {laborant.lastName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Hospital Identity Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {laborant.hospitalId}
            </dd>
          </div> 
        </dl>
      </div>
    </div>
  );
}
