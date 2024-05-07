import { Link } from "react-router-dom";
import { dateToString } from "../utils/DateHelper";



export default function Purchase({ data }) {
  const {
    totalPayment, date, status,
    expenseName, _id
  } = data

  return <div>
    <section>
      <tr className="grid grid-cols-5 bg-gray-100 border-l-4 border-teal-700 items-center w-full justify-between text-center py-3">
        <td>{expenseName}</td>
        <td>{dateToString(date)}</td>
        <td>{totalPayment}</td>
        <td>{status}</td>


        <td>
          <Link to={`/some/${_id}`}>
            <button className="btn btn-info text-white">view</button>
          </Link>
        </td>
      </tr>
    </section>
  </div>;
}
