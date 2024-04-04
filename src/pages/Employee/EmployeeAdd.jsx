import { useState } from "react";
import EmployeeNav from "./EmployeeNav/EmployeeNav";
import ReactDatePicker from "react-datepicker";

const initialState = {
  name: "",
  employeeId: "",
  fathersName: "",
  mothersName: "",
  spouseName: "",
  presentAddress: "",
  permanentAddress: "",
  occupation: "",
  employeeReligion: "",
  dateOfBirth: "",
  employeeEmail: "",
  employeePhoto: "",
  employeeStatus: "Active",
  mobileNumber: "",
  emergencyContactNumber: "",
  educationalQualification: "",
  previousOrganization: {
    previousOrganizationName: '',
    poAddress: '',
    poPosition: '',
    poSalary: '',
    poSwitchReason: '',

  },
  presentPosition: {
    presentDesignation: '',
    currentBranchName: '',
    currentSamityName: '',
    currentSalaryAmount: '',
    mobileBill: '',
    tadaAmount: '',
    additionalTotal: '',
    employeeSecurityFund: '',
  },
}

const EmployeeAdd = () => {

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: new Date(date),

    }));
  };

  const handlePreviousOrganization = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      nominee: {
        ...prevState.nominee,
        [name]: value,
      },
    }));
  }

  const handlePresentPosition = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      nominee: {
        ...prevState.nominee,
        [name]: value,
      },
    }));
  }

  return (
    <div>
      <section>
        <EmployeeNav />
      </section>

      <section>
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">Employee Add </h1>
          <form className="my-8" >
            <section className="grid grid-cols-3 max-w-5xl mx-auto gap-4">

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="name">Name :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="name" name="name" onChange={handleChange} type="text" placeholder="enter your name" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="employee_id">Employee Id :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="employee_id" name="employeeId" onChange={handleChange} type="text" placeholder="enter your id" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="father_name">Father Name :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="father_name" name="fatherName" onChange={handleChange} type="text" placeholder="enter your father name" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="mother_name">Mother Name :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="mother_name" name="motherName" onChange={handleChange} type="text" placeholder="enter your mother name" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="spouse_name">Spouse Name :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="spouse_name" name="spouseName" onChange={handleChange} type="text" placeholder="enter your spouse name" />
              </div>


              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="present_address"> Present Address:</label>
                <textarea className="input input-bordered hover:border-teal-500 " id=" present_address" name="presentAddress" onChange={handleChange} cols="10" rows="1"></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="permanent_address"> Permanent Address:</label>
                <textarea className="input input-bordered hover:border-teal-500 " id=" permanent_address" name="permanentAddress" onChange={handleChange} cols="10" rows="1"></textarea>
              </div>


              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="educational_qualification">Educational Qualification :</label>
                <select id="educational_qualification" name="educationalQualification"
                  onChange={handleChange} className=" input input-bordered input-sm hover:border-teal-500 " >
                  <option >HSC</option>
                  <option >BA</option>
                  <option >B'com</option>
                  <option >BBA</option>
                  <option >BSc</option>
                </select>
              </div>


              <div className="flex flex-col gap-1 ">
                <label className="font-medium" htmlFor="dob"> Date of Birth :</label>
                {/* <input className="input input-bordered input-sm  hover:border-teal-500  " id="dob" name="dateOfBirth" type="date" placeholder="" /> */}
                <ReactDatePicker
                  selected={formData.dateOfBirth}
                  onChange={handleChangeDate}
                  dateFormat={'dd/MM/yyyy'}
                  className="input input-bordered input-sm  hover:border-teal-500  " id="dob" name="dateOfBirth"
                >
                </ReactDatePicker>
              </div>


              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="mobile_no">Mobile Number :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="mobile_no" name="mobileNumber" onChange={handleChange} type="text" placeholder="enter your mobile number" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="email">Email :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="email" name="employeeEmail" onChange={handleChange} type="email" placeholder="enter your email" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="emergency_contact_number">Emergency Contact Number :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="emergency_contact_number" name="emergencyContactNumber" onChange={handleChange} type="text" placeholder="enter emergency contact number" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="religion">Religion :</label>
                <select id="religion" name="employeeReligion" onChange={handleChange} className=" input input-bordered input-sm hover:border-teal-500 " >
                  <option >Islam</option>
                  <option >Hinduism</option>
                  <option >Christianity</option>
                  <option >Buddhism</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="Attach_Photo ">Attach Photo :</label>
                <input className="input input_bordered  hover:border-teal-500 " id="attach_photo" name="employeePhoto" onChange={handleChange} type="file" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="status">Status :</label>
                <select id="status" name="employeeStatus" onChange={handleChange} className=" input input-bordered input-sm hover:border-teal-500 " >
                  <option >Working</option>
                  <option >Resigned</option>
                </select>
              </div>
            </section>

          </form>
        </section>

        {/* Previous Organization Section */}
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">Previous Organization </h1>
          <form className="my-8" >
            <section className="grid grid-cols-3 max-w-5xl mx-auto gap-4">

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="previous_organization_name">Name :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="previous_organization_name" name="previousOrganizationName" onChange={handlePreviousOrganization} type="text" placeholder="enter your name" />
              </div>


              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="previous_organization_address"> Address :</label>
                <textarea className="input input-bordered hover:border-teal-500 " id="previous_organization_address" name="poAddress"
                  onChange={handlePreviousOrganization} cols="10" rows="1"></textarea>
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="font-medium" htmlFor="joining_date"> Joining Date :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="joining_date" type="date" placeholder="" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="po_position">Position :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="po_position" name="poPosition" onChange={handlePreviousOrganization} type="text" placeholder="" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="salary">Salary :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="po_salary" name="poSalary" onChange={handlePreviousOrganization} type="text" placeholder="" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="po_switch_reason">Switch Reason :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="po_switch_reason" name="poSwitchReason"
                  onChange={handlePreviousOrganization} type="text" placeholder="write your reason here" />
              </div>

            </section>

          </form>
        </section>

        {/* Present Position Section */}
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">Present Position </h1>
          <form className="my-8" >
            <section className="grid grid-cols-3 max-w-5xl mx-auto gap-4">

              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="present_designation">Designation :</label>
                <select id="present_designation" name="presentDesignation" onChange={handlePresentPosition} className=" input input-bordered input-sm hover:border-teal-500 " >
                  <option >dummy</option>
                  <option >dummy 2</option>
                  <option >dummy 3</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="font-medium" htmlFor="date_of_joining"> Date of Joining :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="date_of_joining" type="date" placeholder="" />
              </div>


              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="current_branch_name">Branch Name :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="current_branch_name" name="currentBranchName" onChange={handlePresentPosition} type="text" placeholder="Enter your branch name" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="current_samity_name">Samity Name :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="current_samity_name" name="currentSamityName"
                  onChange={handlePresentPosition} type="text" placeholder="Enter your samity name" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="current_salary_amount">Salary Amount :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="current_salary_amount" name="currentSalaryAmount" onChange={handlePresentPosition} type="text" placeholder="auto calculated" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="mobile_bill">Mobile Bill :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="mobile_bill" name="mobileBill" onChange={handlePresentPosition} type="text" placeholder="auto calculated" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="TA/DA_amount">TA/DA :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="TA/DA_amount" name="tadaAmount" onChange={handlePresentPosition} type="text" placeholder="auto calculated" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="additional_total">Additional Total :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="additional_total" name="additionalTotal" onChange={handlePresentPosition} type="text" placeholder="auto calculated" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="employee_security_fund">Employee Security Fund:</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="employee_security_fund" name="employeeSecurityFund" onChange={handlePresentPosition} type="text" placeholder="Enter your security money deposit" />
              </div>

            </section>
          </form>
        </section>

        {/* Gurantor Section */}
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">Guarantor Details </h1>
          <form className="my-8" >
            <section className="grid grid-cols-3 max-w-5xl mx-auto gap-4">


              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="name">Name :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="name" type="text" placeholder="Enter gurantor name" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="address"> Address :</label>
                <textarea className="input input-bordered hover:border-teal-500 " id=" address" cols="10" rows="1"></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="relation">Relation :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="relation" type="text" placeholder="Enter your relation with gurantor" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="occupation">Occupation :</label>
                <input className="input input-bordered input-sm  hover:border-teal-500  " id="occupation" type="text" placeholder="Enter gurantor occupation" />
              </div>

            </section>
          </form>
        </section>

        <div className="w-fit mx-auto m-8">
          <input className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white" type="submit" />
        </div>
      </section>
    </div>
  );
};

export default EmployeeAdd;