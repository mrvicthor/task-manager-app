import { Subtask } from "@prisma/client";

interface TaskProps {
  title: string;
  id: number;
  subtask: Subtask[];
}

const Task = ({ title, id, subtask }: TaskProps) => {
  const filteredSubtask = subtask.filter((t) => t.taskId === id);
  const totalTaskCompleted = filteredSubtask.filter(
    (item) => item.isCompleted === true
  );

  return (
    <>
      <p>{title}</p>
      <p className="text-xs text-[#828FA3] mt-2">
        {totalTaskCompleted.length} of {filteredSubtask.length} subtasks
      </p>
    </>
  );
};

export default Task;
