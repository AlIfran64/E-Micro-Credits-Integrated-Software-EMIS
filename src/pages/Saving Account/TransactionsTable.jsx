import { dateToString } from "../../utils/DateHelper";

function TransactionsTable({ data }) {
  console.log(data);

  const { date, amount, description, _id } = data;

  return (
    <div>
      <tr className="grid grid-cols-3 text-xs md:text-base bg-gray-100  border-b-4   md:grid-cols-3 items-center w-full justify-between text-center py-3">
        <td>{dateToString(date)}</td>
        <td>{amount}</td>
        <td className="hidden md:block">{description}</td>
      </tr>
    </div>
  );
}

export default TransactionsTable;
