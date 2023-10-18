import { useNavigate } from "react-router-dom";

const Report = ({ report, deleteReport }) => {
  const navigate = useNavigate();
  const editReport = (e, id) => {
    e.preventDefault();
    navigate(`/report/update/${id}`);
  };

  const viewReport = (e, id) => {
    e.preventDefault();
    navigate(`/report/view/${id}`)
  }

  return (
    <tr key={report.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{report.patientFirstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{report.patientLastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">  
        <div className="text-sm text-gray-500">{report.identityNumber}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{report.diagnosis}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{report.givenDate}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
      <a
          href="/"
          onClick={(e, id) => viewReport(e, report.id)}
          className="text-blue-600 hover:text-blue-800 px-4 hover:cursor-pointer"
        >
          View
        </a>
        <a
          href="/"
          onClick={(e, id) => editReport(e, report.id)}
          className="text-blue-600 hover:text-blue-800 px-4 hover:cursor-pointer"
        >
          Edit
        </a>
        <a
          href="/"
          onClick={(e, id) => deleteReport(e, report.id)}
          className="text-red-600 hover:text-red-800 hover:cursor-pointer"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Report;
