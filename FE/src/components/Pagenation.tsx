/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter } from "next/router";
import { useEffect } from "react";

// interface PropType {
//   currentPage: number;
//   setCurrentPage: Dispatch<SetStateAction<number>>;
//   path: string;
// }

export default function Pagenation(props:any): JSX.Element {
  const router = useRouter();
  const { setShowJobs } = props

  useEffect(()=>{
    if(router.query.page){
      fetch(`http://localhost:8008/job/page/${router.query.page}`).then((res)=> res.json()).then((res)=> setShowJobs(res))
    }else{
      fetch(`http://localhost:8008/job/page/1`).then((res)=> res.json()).then((res)=> {setShowJobs(res); console.log(res)})
    }
    
  },[router, setShowJobs])

  return <div className="flex gap-5">
    <button onClick={(e:any)=>{
      router.push({query: {page: e.target.innerHTML}}, {}, {shallow: true})
    }}
    className="border rounded-md px-2 py-1">1</button>
    <button onClick={(e:any)=>{
      router.push({query: {page: e.target.innerHTML}}, {}, {shallow: true})
    }}
    className="border rounded-md px-2 py-1">2</button>
    <button onClick={(e:any)=>{
      router.push({query: {page: e.target.innerHTML}}, {}, {shallow: true})
    }}
    className="border rounded-md px-2 py-1">3</button>
    <button onClick={(e:any)=>{
      router.push({query: {page: e.target.innerHTML}}, {}, {shallow: true})
    }}
    className="border rounded-md px-2 py-1">4</button>

  </div>
  // const {currentPage, setCurrentPage, path} = props;
  // const [pageNumber, setPageNumber] = useState<number>(1);

  // const numbers = [];
  // const active =
  //   "p-3 rounded-xl m-2";
  // const inActive = " p-3 rounded-xl m-2 border-2";
  

  // const lastPage = pageNumber && Math.ceil(pageNumber / 10);

  // for (let i = 1; i <= lastPage; i++) {
  //   numbers.push(i);
  // }

  // useEffect(() => {
  //   fetch(`http://localhost:8008/${path}/pageNumber`)
  //     .then((response) => response.json())
  //     .then((res) => setPageNumber(res));
  // }, [path]);
  // return (
  //   <>
  //     {lastPage === 1 ? (
  //       <></>
  //     ) : (
  //       <>
  //         {currentPage !== 1 && (
  //           <Link href={`${setCurrentPage(currentPage - 1)}`}>
  //             <PageBtn btnName={"before"} btnClass={inActive} />
  //           </Link>
  //         )}
  //         {currentPage > 2 && (
  //           <Link href={`1`} onClick={() => setCurrentPage(1)}>
  //             <PageBtn btnName={1} btnClass={inActive} />
  //           </Link>
  //         )}
  //         {currentPage > 3 && "..."}
  //         {currentPage > 1 && (
  //           <Link href={`${currentPage - 1}`}>
  //             <PageBtn btnName={currentPage - 1} btnClass={inActive} />
  //           </Link>
  //         )}
  //         <Link href={`${currentPage}`}>
  //           <PageBtn btnName={currentPage} btnClass={active}/> 
  //         </Link>
  //         {lastPage && lastPage > currentPage && (
  //           <Link
  //             href={`${currentPage + 1}`}
  //             onClick={() => setCurrentPage(currentPage + 1)}
  //           >
  //             <PageBtn btnName={currentPage + 1} btnClass={inActive} />
  //           </Link>
  //         )}
  //         {lastPage && lastPage - 2 > currentPage && "..."}
  //         {lastPage && lastPage - 1 > currentPage && (
  //           <Link href={`${lastPage}`} onClick={() => setCurrentPage(lastPage)}>
  //             <PageBtn btnName={lastPage} btnClass={inActive} />
  //           </Link>
  //         )}
  //         {currentPage !== lastPage && (
  //           <Link
  //             href={`${currentPage + 1}`}
  //             onClick={() => setCurrentPage(currentPage + 1)}
  //           >
  //             <PageBtn btnName={"After"} btnClass={inActive} />
  //           </Link>
  //         )}
  //       </>
  //     )}
  //   </>
  // );
}
