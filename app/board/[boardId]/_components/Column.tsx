"use client";
import { Subtask } from "@prisma/client";
import { Task as List } from "@/lib/models";
import { Droppable } from "@hello-pangea/dnd";
import { StatusCircle, TaskClient, Task } from "@/components";

interface ColumnProps {
  status: string;
  data: List[];
  subtask: Subtask[];
  index: number;
  id: number;
}
const Column = ({ status, data, subtask, index, id }: ColumnProps) => {
  return (
    <li>
      <div>
        <div className="flex items-center gap-2 mb-6 font-bold text-xs text-[#828FA3]">
          <StatusCircle status={status} />
          <h2 className="uppercase">
            {status} ({data.length})
          </h2>
        </div>

        <Droppable droppableId={index.toString()} type="card">
          {(provided) => (
            <ol
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-5 min-w-[280px] max-w-[280px] min-h-[150px]"
            >
              {data.map((item, index) => (
                <TaskClient
                  key={item.id}
                  index={index}
                  item={item}
                  subtask={subtask}
                >
                  <Task title={item.title} id={item.id} subtask={subtask} />
                </TaskClient>
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
      </div>
    </li>
  );
};

export default Column;
