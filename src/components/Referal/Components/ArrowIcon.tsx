const ArrowIcon = ({ isOpen, width = '20', height = '20' }: { isOpen: boolean, width?: string, height?: string }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={{
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease",
    }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon