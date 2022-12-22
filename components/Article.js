import {useRouter} from 'next/router';
import { parse } from 'node-html-parser';
const Article = ({img, title, desc, bg, cat, id}) => {
  const router = useRouter();
  const getText = (html) =>{
    const doc =  parse(html, "text/html")
    return doc.textContent
  }

  return(
    <div id={`${cat}`} className="flex flex-col w-full w-300 md:w-[375px] lg:w-[200px] gap-[10px]  pb-5 mr-2 shadow-sm">
      <img src={img} alt="" className="w-full  object-contain cursor-pointer" onClick={() => router.push(`/post/${id}`)}/>
      <div className="flex flex-col items-center gap-5 w-full">
        <h1 className={`${bg === "#808080" ? "text-black" : "text-gray-500"} text-lg`}>{title.slice(0, 50)}...</h1>
        <p className={`${bg === "#808080" ? "text-gray-600" : "text-gray-200 text-md"} leading-2`}>{getText(desc.slice(0, 180))}...</p>
      </div>
    </div>
  )
}

export default Article