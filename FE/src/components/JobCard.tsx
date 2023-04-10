import Card from "../styles/JobCard.module.css";

export default function JobCard(): JSX.Element {
  return (
    <div>
      <div className={Card.jobCard}>
        <h1 className={Card.cardTitle}>Title</h1>
        <p className={Card.cardDisc}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,
          tenetur.
        </p>
        <span className={Card.cardmoney}>$$$</span>
      </div>
    </div>
  );
}
