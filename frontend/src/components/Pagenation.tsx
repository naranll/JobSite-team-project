
import {useRouter} from "next/router";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Pagenation(): JSX.Element {
  const router = useRouter();


  function pagenationHandler(e: any) {
    const page = e.currentTarget.innerHTML;
    router.push({query: {...router.query, page}});
  }

  // console.log("router.query", router.query)

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
