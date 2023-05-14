interface PropType {
    btnName: string | number;
    btnClass: string;
}

export default function PageBtn(props: PropType): JSX.Element{
    const {btnName, btnClass} = props;
    return(
        <>
         <button className={btnClass}>
            {btnName}
         </button>
        </>
    )
}