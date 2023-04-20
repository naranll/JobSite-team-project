export default function Header():JSX.Element{
    return(<div className="h-[80px] p-11 flex justify-between items-center bg-white">
        <h1 className="text-2xl font-semibold">Page name</h1>
        <div className="flex gap-[20px]">
            <div>bell</div>
            <span>img</span>
            <h6>Admin name</h6>
        </div>
    </div>)
}