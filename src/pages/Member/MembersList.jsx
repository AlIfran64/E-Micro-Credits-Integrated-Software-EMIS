import MemberNav from "./MemberNav/MemberNav";
import BranchSamitySelector from "../../component/branchSamitySelector";
import { useState, useEffect } from "react";
import useMutationHook from "../../../hooks/useMutationHook";
import { getLocalUsersByBranchIdAndSmityId } from "../../../api/admin";
import ListView from "../../component/ListView";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const initalState = {
  branchId: null,
  samityId: null,
};

const MembersList = () => {
  const [formData, setFormData] = useState(initalState);
  let [searchParams, setSearchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: ["member-list"],
    queryFn: () => getLocalUsersByBranchIdAndSmityId(formData),
    enabled: formData.branchId && formData.samityId ? true : false,
    initialData: null,
  });
  useEffect(() => {
    const branchId = searchParams.get("branchId");
    const samityId = searchParams.get("samityId");
    if (branchId && samityId) {
      setFormData({ branchId, samityId });
    }
    if (formData.branchId && formData.samityId) {
      setSearchParams({
        branchId: formData.branchId,
        samityId: formData.samityId,
      });
    }
  }, []);
  return (
    <div>
      <section>
        <MemberNav />
      </section>

      <section className="m-2">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Members List
        </h1>

        <section className="flex flex-col md:flex-row gap-4 my-8 pb-8 md:max-w-5xl mx-auto items-center  border-b-2">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <BranchSamitySelector callBackFn={setFormData} />
          </div>
        </section>

        {/* Local User List */}
        <section>
          <div className="md:m-8">
            <table className="w-full mt-12 ">
              <tr className="grid grid-cols-3  text-xs md:text-base bg-teal-700  py-4 text-white md:grid-cols-7 items-center justify-center gap-1 text-center">
                <th>Sl No.</th>
                <th>Joining Date</th>
                <th>Member Name</th>
                <th>Phone Number</th>
                <th>Occupation</th>
                <th className="hidden md:block">Present Address</th>
                <th className="hidden md:block">Action</th>
              </tr>

              {data
                ? data.data.map((user, key) => (
                  <ListView key={key} data={user} />
                ))
                : null}
            </table>
          </div>
        </section>
      </section>
    </div>
  );
};

export default MembersList;
