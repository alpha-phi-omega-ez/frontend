interface LoanerTechProps {
  inoffice: boolean;
  desc: string;
  id: number;
}

export default function LoanerTech({ inoffice, desc, id }: LoanerTechProps) {
  return (
    <div>
      <h2>{desc}</h2>
      <p>{id}</p>
      <div
        className={`status-indicator ${inoffice ? "available" : "unavailable"}`}
      ></div>
      <p>{inoffice ? "Available" : "Unavailable"}</p>
    </div>
  );
}
