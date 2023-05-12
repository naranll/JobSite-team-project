import { useRouter } from "next/router";

export default function Applicants(): JSX.Element {
  const router = useRouter();
  const { id, jobId } = router.query;

  return (
    <div>
      applicants page for user: {id}, job: {jobId}{" "}
    </div>
  );
}
