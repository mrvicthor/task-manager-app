"use client";
import { Task as List, Subtask } from "@prisma/client";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { StatusCircle, TaskClient, Task } from "@/components";

interface ColumnProps {
  status: string;
  data: List[];
  subtask: Subtask[];
  index: number;
  id: number;
}
const Column = ({ status, data, subtask, index, id }: ColumnProps) => {
  // const filteredResult = data.filter((task) => task.columnId === id);

  return (
    <Draggable draggableId={status} index={index}>
      {(provided) => (
        <li {...provided.draggableProps} ref={provided.innerRef}>
          <div {...provided.dragHandleProps} className="">
            <div className="flex items-center gap-2 mb-6 font-bold text-xs text-[#828FA3]">
              <StatusCircle status={status} />
              <h2 className="uppercase">
                {status} ({data.length})
              </h2>
            </div>

            <Droppable droppableId={status} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-5 min-w-[280px] max-w-[280px]"
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
      )}
    </Draggable>
  );
};

export default Column;
