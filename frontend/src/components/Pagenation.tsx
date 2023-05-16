/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Pagenation(props: any): JSX.Element {
  const router = useRouter();
  const { setShowJobs } = props;

  useEffect(() => {
    if (router.query.page) {
      fetch(
        `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/page/${router.query.page}`
      )
        .then((res) => res.json())
        .then((res) => setShowJobs(res));
    } else {
      fetch(`${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/page/1`)
        .then((res) => res.json())
        .then((res) => {
          setShowJobs(res);
          console.log(res);
        });
    }
  }, [router, setShowJobs]);

  function pagenationHandler(e: any) {
    const page = e.currentTarget.innerHTML;
    router.push({ query: { ...router.query, page } });
  }

  return (
    <div className="flex gap-5 justify-center	">
      <button
        onClick={pagenationHandler}
        className="border rounded-md px-2 py-1"
      >
        1
      </button>
      <button
        onClick={pagenationHandler}
        className="border rounded-md px-2 py-1"
      >
        2
      </button>
      <button
        onClick={pagenationHandler}
        className="border rounded-md px-2 py-1"
      >
        3
      </button>
      <button
        onClick={pagenationHandler}
        className="border rounded-md px-2 py-1"
      >
        4
      </button>
    </div>
  );
}
