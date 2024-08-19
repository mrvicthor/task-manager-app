import StatusCircle from "../../../../components/StatusCircle";
import { Task } from "@prisma/client";

interface ListHeaderProps {
  status: string;
  data: Task[];
}

const ListHeader = ({ status, data }: ListHeaderProps) => {
  return (
    <div className="flex items-center gap-2 mb-6 font-bold text-xs text-[#828FA3]">
      <StatusCircle status={status} />
      <h2 className="uppercase">
        {status} ({data.length})
      </h2>
    </div>
  );
};

export default ListHeader;
