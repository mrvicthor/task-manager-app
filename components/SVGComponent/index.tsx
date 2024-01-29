interface SVGProps {
  color: string;
  pathString: string;
}

function SvgComponent({ color, pathString }: SVGProps) {
  return (
    <svg
      width={16}
      height={16}
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <path d={pathString} fill="currentColor" />
    </svg>
  );
}

export default SvgComponent;
