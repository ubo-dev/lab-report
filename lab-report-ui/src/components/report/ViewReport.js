import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReportService from "../../services/ReportService";
import Pending from "../imageUpload/Pending";
import Form from "../imageUpload/Form";
import Uploaded from "../imageUpload/Uploaded";

export default function ViewReport() {
  const [isPending, setIsPending] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState({
    id: id,
    patientFirstName: "",
    patientLastName: "",
    identityNumber: "",
    diagnosis: "",
    diagnosisDetails: "",
    imageData: null,
    laborantId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReportService.getReportById(report.id);
        console.log(response.data.laborantId);
        setReport(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [report.id]);
  return (
    <div className="px-40 py-16">
      <div className="px-4 sm:px-0">
        <button
          onClick={() => navigate("/report/all")}
          className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Back To Home{" "}
        </button>
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Report Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and report details.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              First name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {report.patientFirstName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {report.patientLastName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Identity Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {report.identityNumber}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Diagnosis
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {report.diagnosis}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Diagnosis Details
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {report.diagnosisDetails}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Given Date
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {report.givenDate}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Document Photo
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <div className="w-full h-screen bg-grey flex justify-center items-center">
                  {error ? (
                    <p className="text-red-600 text-center border-red-600 rounded-lg border-2 bg-red-300 px-4 py-2">
                      internal server error , Refresh the page and try again
                    </p>
                  ) : isPending ? (
                    <Pending />
                  ) : image && url ? (
                    <Uploaded image={image} url={url} />
                  ) : (
                    <Form
                      image={image}
                      setImage={setImage}
                      setIsPending={setIsPending}
                      setUrl={setUrl}
                      setError={setError}
                    />
                  )}
                </div>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
