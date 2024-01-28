"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

type DropAreaProps = {
  children: React.ReactNode;
};

const DropArea = ({ children }: DropAreaProps) => {
  return (
    <DragDropContext onDragEnd={(result) => console.log(result)}>
      <Droppable droppableId="list">
        {(provided) => (
          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-5 min-w-[280px] max-w-[280px]"
          >
            {children}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DropArea;
