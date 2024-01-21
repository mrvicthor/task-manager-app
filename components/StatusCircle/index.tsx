type StatusColorMap = Record<string, string>;
interface StatusCircleProps {
  status: string;
}
const getStatusColor = (status: string, colorMap: StatusColorMap): string => {
  return colorMap[status] || "#FBD968"; // Default to black if no mapping found
};

const StatusCircle = ({ status }: StatusCircleProps) => {
  const defaultColorMap: StatusColorMap = {
    Todo: "#49C4E5",
    Doing: "#8471F2",
    Done: "#67E2AE",
    // Add more status-color mappings as needed
  };

  const fillColor = getStatusColor(status, defaultColorMap);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
    >
      <circle cx="7.5" cy="7.5" r="7.5" fill={fillColor} />
    </svg>
  );
};

export default StatusCircle;
