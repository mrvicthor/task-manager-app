interface TaskProps {
  title: string;
}

const Task = ({ title }: TaskProps) => {
  return <p>{title}</p>;
};

export default Task;
