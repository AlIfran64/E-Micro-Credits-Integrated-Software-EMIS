import { useEffect, useState } from "react";
import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { IconSearch } from "../../../icons/icons";
import {
  createDepositAccount,
  searchUserByPhoneNumber,
} from "../../../api/admin";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import useMutationHook from "../../../hooks/useMutationHook";
const initialState = {
  periodOfTimeInMonths: "",
  openingDate: "",
  matureDate: "",
  paymentTerm: "Daily",
  perInstallment: "",
  profitPercentage: "",
  onMatureAmount: "",
};
const getDepositDates = (periodInMonths, status, perInstallment, profit) => {
  let installmentCount;
  const startDate = moment();
  const endDate = moment().add(periodInMonths, "months");
  const daysInPeriod = endDate.diff(startDate, "days");
  console.log({ daysInPeriod });
  switch (status) {
    case "Daily":
      installmentCount = daysInPeriod;
      break;
    case "Weekly":
      installmentCount = Math.ceil(daysInPeriod / 7);
      break;
    case "Fortnightly":
      installmentCount = Math.ceil(daysInPeriod / 14);
      break;
    case "Monthly":
      installmentCount = periodInMonths;
      break;
    case "Quarterly":
      installmentCount = Math.ceil(periodInMonths / 4);
      break;
    case "Half-yearly":
      installmentCount = Math.ceil(periodInMonths / 6);
      break;
    case "Yearly":
      installmentCount = Math.ceil(periodInMonths / 12);
      break;
    default:
      break;
  }
  const totalAmount = installmentCount * perInstallment;
  console.log({ totalAmount, profit });

  const profitAmount = (profit / 100) * totalAmount;
  console.log({ profitAmount });
  const maturedAmount = totalAmount + profitAmount;
  console.log(installmentCount);

  return maturedAmount;
};

const Deposit = () => {
  const [formData, setFormData] = useState(initialState);
  const [searchedUser, setSearchedUser] = useState(null);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(createDepositAccount, {
      onSuccess: () => {
        toast.success("User added successfully!");
      },
    });
  // * handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "periodOfTimeInMonths") {
      const tempMatureDate = moment().add(value, "months").format("YYYY-MM-DD");
      setFormData((prev) => ({ ...prev, matureDate: tempMatureDate }));
    }
    if (name === "profitPercentage") {
      const { periodOfTimeInMonths, perInstallment, paymentTerm } = formData;

      const total = getDepositDates(
        periodOfTimeInMonths,
        paymentTerm,
        perInstallment,
        value
      );
      setFormData((prev) => ({ ...prev, onMatureAmount: total }));
    }
  };
  // * handleSearchUser
  const handleSearchUser = async (event) => {
    const { value } = event.target;
    if (value.length >= 11) {
      const userData = await searchUserByPhoneNumber(value);
      if (userData.length) {
        setShowLoadingIcon(false);
        setSearchedUser(userData[0]);
      } else {
        toast.error("No Data Found");
        setShowLoadingIcon(false);
      }
    } else {
      setShowLoadingIcon(true);
    }
  };
  // !handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      memberId: searchedUser._id,
      ...formData,
    };
    mutate(data);
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, openingDate: new Date() }));
  }, []);
  return (
    <div>
      <section>
        <SavingAccountNav />
      </section>

      <section>
        {/* input container */}
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Open Deposit Account Form{" "}
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-3 max-w-5xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="member_id">
                  Search By Phone Number :{" "}
                </label>
                <label className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2">
                  <input
                    onChange={handleSearchUser}
                    type="number"
                    id="member_id"
                    className="grow  "
                    placeholder="Search"
                  />
                  {!showLoadingIcon ? (
                    <IconSearch className="w-6 h-6 opacity-50" />
                  ) : (
                    <MoonLoader size={15} />
                  )}
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="acc_id">
                  User Name :
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="acc_id"
                  type="text"
                  value={searchedUser ? searchedUser.name : "No Data Available"}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="occupation">
                  Status :
                </label>
                <select
                  onChange={handleChange}
                  name="paymentTerm"
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled>Select a Value</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Half-Yearly">Half-Yearly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="period_of_time">
                  Period of time :
                </label>
                <input
                  name="periodOfTimeInMonths"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="period_of_time"
                  type="text"
                  placeholder="In months"
                  value={formData.periodOfTimeInMonths}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="per_installment">
                  Per installment :
                </label>
                <input
                  onChange={handleChange}
                  name="perInstallment"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="per_installment"
                  type="number"
                  placeholder="money amount"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="profit">
                  Profit :
                </label>
                <input
                  name="profitPercentage"
                  onChange={handleChange}
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="profit"
                  type="number"
                  placeholder="10%"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="on_mature_amount">
                  {" "}
                  On Mature amount :
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="on_mature_amount"
                  type="number"
                  value={formData.onMatureAmount}
                  placeholder="500 tk"
                />
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="font-medium" htmlFor="opening_date">
                  {" "}
                  Opening Date :
                </label>

                <DatePicker
                  selected={formData.openingDate}
                  dateFormat="dd/MM/yyyy"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  disabled
                  showIcon
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="mature_date">
                  Mature Date :
                </label>
                <DatePicker
                  selected={formData.matureDate}
                  dateFormat="dd/MM/yyyy"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  disabled
                  showIcon
                />
              </div>

              <div className="flex flex-col gap-1 col-span-3">
                <label className="font-medium" htmlFor="first_due_date">
                  {" "}
                  First Due Date :
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="first_due_date"
                  type="date"
                  placeholder=""
                />
              </div>
            </section>
            {isError ? errorMessage : null}

            <div className="w-full flex justify-center  mt-8">
              <button
                className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
                onClick={handleSubmit}
              >
                Submit{" "}
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default Deposit;
