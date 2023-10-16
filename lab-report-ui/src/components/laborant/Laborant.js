import { useNavigate } from "react-router-dom";

const Laborant = ({ laborant }) => {
  const navigate = useNavigate();

  const viewLaborant = (e, id) => {
    e.preventDefault();
    navigate(`/laborant/view/${id}`)
  }

  return (
    <tr key={laborant.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{laborant.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{laborant.lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">  
        <div className="text-sm text-gray-500">{laborant.hospitalId}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
      <a
          href="/"
          onClick={(e, id) => viewLaborant(e, laborant.id)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer"
        >
          View
        </a>
      </td>
    </tr>
  );
};

export default Laborant;
