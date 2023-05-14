import { Dispatch, SetStateAction, useState, useEffect } from "react";
import  Link from "next/link";
import PageBtn from "./PageBtn";

interface PropType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  path: string;
}

export default function Pagenation(props: PropType): JSX.Element {
  const {currentPage, setCurrentPage, path} = props;
  const [pageNumber, setPageNumber] = useState<number>(1);

  const numbers = [];
  const active =
    "p-3 rounded-xl m-2";
  const inActive = " p-3 rounded-xl m-2 border-2";
  

  const lastPage = pageNumber && Math.ceil(pageNumber / 10);

  for (let i = 1; i <= lastPage; i++) {
    numbers.push(i);
  }

  useEffect(() => {
    fetch(`http://localhost:8008/${path}/pageNumber`)
      .then((response) => response.json())
      .then((res) => setPageNumber(res));
  }, [path]);
  return (
    <>
      {lastPage === 1 ? (
        <></>
      ) : (
        <>
          {currentPage !== 1 && (
            <Link href={`${setCurrentPage(currentPage - 1)}`}>
              <PageBtn btnName={"before"} btnClass={inActive} />
            </Link>
          )}
          {currentPage > 2 && (
            <Link href={`1`} onClick={() => setCurrentPage(1)}>
              <PageBtn btnName={1} btnClass={inActive} />
            </Link>
          )}
          {currentPage > 3 && "..."}
          {currentPage > 1 && (
            <Link href={`${currentPage - 1}`}>
              <PageBtn btnName={currentPage - 1} btnClass={inActive} />
            </Link>
          )}
          <Link href={`${currentPage}`}>
            <PageBtn btnName={currentPage} btnClass={active}/> 
          </Link>
          {lastPage && lastPage > currentPage && (
            <Link
              href={`${currentPage + 1}`}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <PageBtn btnName={currentPage + 1} btnClass={inActive} />
            </Link>
          )}
          {lastPage && lastPage - 2 > currentPage && "..."}
          {lastPage && lastPage - 1 > currentPage && (
            <Link href={`${lastPage}`} onClick={() => setCurrentPage(lastPage)}>
              <PageBtn btnName={lastPage} btnClass={inActive} />
            </Link>
          )}
          {currentPage !== lastPage && (
            <Link
              href={`${currentPage + 1}`}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <PageBtn btnName={"After"} btnClass={inActive} />
            </Link>
          )}
        </>
      )}
    </>
  );
}
