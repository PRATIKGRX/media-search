import Link from "next/link"
import { useSelector } from "react-redux"
const ResultCard = ({ data }) => {
    const activeTab = useSelector((state)=>state.search.activeTab);
    const routeMap ={
        photo:"photo",
        video:"video",
        gif:"gif"
    };
    const href = `/${routeMap[activeTab]}/${data._id}`;
    return (
        <Link href={href}>
            <div className="flex flex-col">
                <div>
                    <img src={data.thumbnail} className="aspect-square object-cover object-center" alt={data.title} />
                </div>
                <div>
                    <p>{data.thumb_description}</p>
                </div>
            </div>
        </Link>
    )
}

export default ResultCard