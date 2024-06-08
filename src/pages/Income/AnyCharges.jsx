import IncomeNav from "./IncomeNav/IncomeNav";
import BranchSamitySelector from "../../component/branchSamitySelector";
import useMutationHook from "../../../hooks/useMutationHook";
import { useState } from "react";
import { getIncome } from "../../../api/admin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const initalState = {
  date: new Date(),
};

const AnyCharges = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const { mutate, isPending } = useMutationHook(getIncome, {
    onSuccess: (data) => {
      console.log(data);
      setData(data.data);
    },
  });
  function handleSubmit(event) {
    event.preventDefault();
    mutate(date);
  }
<<<<<<< HEAD
  // console.log(income);
=======
>>>>>>> 15a764e4b6002f29ddf92fb79b917edfdba7c093

  return (
    <div>
      <section>
        <IncomeNav />
      </section>

      <section className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-1 mt-4">
          <label className="font-medium" htmlFor="membership_fee ">
            Select Date:
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="input input-bordered input-sm  hover:border-teal-500 w-full"
            dateFormat="dd/MM/yyyy"
            required
          />
          <button
            className="btn btn-sm w-fit bg-teal-500 text-white hover:bg-teal-700 mx-auto mt-4"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </section>
      <section>
        {data
          ? data.incomeHeadTransaction.map((a, idx) => {
              return (
                <>
                  <h1>Head : {a._id}</h1>
                  <h1>Profit : {a.total}</h1>
                </>
              );
            })
          : null}
        {data
          ? data.loanProfit.map((a, idx) => {
              return (
                <>
                  <h1>Head : {a._id}</h1>
                  <h1>Profit : {a.total}</h1>
                </>
              );
            })
          : null}{" "}
        {data
          ? data.memberProfit.map((a, idx) => {
              return (
                <>
                  <h1>Head : {a._id}</h1>
                  <h1>Profit : {a.total}</h1>
                </>
              );
            })
          : null}
      </section>
    </div>
  );
};

export default AnyCharges;
