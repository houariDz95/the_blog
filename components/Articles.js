import Article from './Article';


const Articles = ({title, articles, bg}) => {
  return(
    <div className={`w-full h-full bg-[${bg}] my-5 py-10`}>
      <div className="max-w-[90%] w-full m-auto">
      <h1 className={`${bg === "#808080" ? "text-black" : "text-white"} text-3xl font-semibold uppercase`}>{title}</h1>
      <div className="w-full grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-10 md:gap-5">
        {articles.slice(0 ,4).map(article => (
          <Article key={article.id} id={article.id} cat={article.cat} img={article.img} desc={article.desc} title={article.title} bg={bg}/>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Articles