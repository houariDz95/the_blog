import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {BASE_URL} from '../utils';
import moment from 'moment';
import { useRouter } from 'next/router';

const styles = {
  wrapper: "w-screen  bg-[#1a1b1f] px-10 xl:px-0",
  container: "max-w-[1024px] w-full m-auto ",
  bigLogoContainer: ' border-y-[1px] border-white text-center hidden xl:block',
  bigLogo: "text-[95px] md:text-[150px] lg:text-[200px] font-bold text-white uppercase",
  contentWrapper: "flex lg:flex-row flex-col  justify-center gap-10 pt-10",
  contentLeft: "cursor-pointer md:flex lg:block",
  contentLeftImg: "w-full md:w-[250px] lg:w-full object-contain",
  contentLeftContainer: "md:ml-10 lg:ml-0",
  contentLeftSpan: "text-sm my-4 text-gray-500",
  contentLeftH1: "text-xl md:text-2xl font-semibold text-white",
  contentLeftP: "my-2 text-lg md:text-xl  text-gray-200",
  contentRightWrapper: "flex items-center flex-row-reverse md:flex-row gap-5 border-b-[1px] border-gray-500 pb-5 last:border-b-0 first:border-t-[1px] md:first:border-t-0 cursor-pointer",
  contentRightImg: "h-[150px] w-[150px] object-contain",
  contentRightSpan: "text-sm text-gray-500",
  contentRightH1: "text-xl text-white",
}



const Hero = () => {
  const [articles, setArticles] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getArticles = async () => {
      const res = await axios.get(`${BASE_URL}/api/posts/posts`);
      setArticles(res.data);
    }
    getArticles()
  }, [])
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.bigLogoContainer}>
          <h1 className={styles.bigLogo}>The Blog</h1>
        </div>
        <div className={styles.contentWrapper}>
          <div className="flex-1">
            {articles.slice(0, 1).map(article => (
            <div className={styles.contentLeft} key={article.id} onClick={() => router.push(`/post/${article.id}`)}>
              <img src={article.img} alt="" className={styles.contentLeftImg}/>
              <div className={styles.contentLeftContainer}>
                <span className={styles.contentLeftSpan}>{moment(article.date).fromNow()}</span>
                <h1 className={styles.contentLeftH1}>{article.title}</h1>
                <p className={styles.contentLeftP}>{article.dsc}</p>
              </div>
            </div>
          ))}
          </div>
          <div className="flex-1 ">
            {articles.slice(1, 4).map(article => (
              <div className={styles.contentRightWrapper} key={article.id} onClick={() => router.push(`/post/${article.id}`)}>
                <img src={article.img} alt="" className={styles.contentRightImg} />
                <div>
                  <span className={styles.contentRightSpan}>{moment(article.date).fromNow()}</span>
                  <h1 className={styles.contentRightH1}>{article.title}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero


