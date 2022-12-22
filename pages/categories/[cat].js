import React from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import {BASE_URL} from '../../utils';
import ArticleCard from '../../components/ArticleCard';

const styles = {
  wrapper: 'max-w-[1124px] m-auto px-10 md:px-20',
}

const Cat = ({articles}) => {
  return (
    <div>
      <Navbar single/>
      <div className={styles.wrapper}>
        <ArticleCard posts={articles} />
      </div>
      <Footer />
    </div>
  )
}

export default Cat



export const getServerSideProps = async ({ params }) => {
  const response = await axios.get(`${BASE_URL}/api/cat/${params.cat}`);
  const articles = response.data
  return {
    props: {  articles }
  }
}
