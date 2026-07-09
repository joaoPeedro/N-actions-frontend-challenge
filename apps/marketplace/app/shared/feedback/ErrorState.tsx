interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div 
      style={{
        padding: "24px",
        backgroundColor: "#fef2f2",
        border: "1px solid #fca5a5",
        borderRadius: "8px",
        color: "#991b1b",
        textAlign: "center",
        fontSize: "1.1rem"
      }}
      role="alert"
    >
      {message}
    </div>
  );
}
