import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

export const CashBackFro = () => {
  const [contests, setContests] = useState([]);
  const [isTruncated, setIsTruncated] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/games')
      .then(response => {
        const data = response.data;
        setContests(data);
        setIsTruncated(data.map(() => true));

        // Extract unique categories from the contests
        const uniqueCategories = ['All', ...new Set(data.map(contest => contest.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleTruncate = (index) => {
    setIsTruncated(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Filter contests based on the selected category
  const filteredContests = selectedCategory === 'All' 
    ? contests 
    : contests.filter(contest => contest.category === selectedCategory);

  return (
    <div style={styles.container}>
      <div id='mainselecttag'>
  <select value={selectedCategory} onChange={handleCategoryChange}>
    {categories.map((category, index) => (
      <option key={index} value={category}>
        {category}
      </option>
    ))}
  </select>
  <div id='scrollContainer'>
    {categories.map((category, index) => (
      <h3
        key={index}
        style={selectedCategory === category ? styles.selectedCategory : styles.category}
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </h3>
    ))}
  </div>
</div>

      {filteredContests.map((contest, index) => (
        <div
          key={contest._id}
          style={{
            ...styles.content,
            marginTop: index === 0 ? '0' : '-60px',
          }}
        >
          <div style={styles.user}>
            <img style={styles.logoimage} src={contest.logo} alt={contest.organizerName} />
            <h3>{contest.organizerName}</h3>
          </div>

          <Slider {...settings}>
            {contest.images.map((image, idx) => (
              <div key={idx}>
                <Link to={`/contest/${contest._id}`}>
                  <img style={styles.contestimg} src={image} alt={contest.title} />
                </Link>
              </div>
            ))}
          </Slider>

          <div style={styles.likeprize}>
            <div>
              <img style={styles.icons} src="https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png" alt="Heart Icon" />
              <img style={styles.icons} src="https://inschrijvenbijommerland.nl/img/404222.jpg" alt="Trophy Icon" />
              <img style={styles.icons} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpZ3wldcL4dCjGMEX0vij_ERah5lZxmunPnw&s" alt="Medal Icon" />
            </div>
            <div style={styles.rightdiv}>
              <h4>Total Prize Money</h4>
              <h4 style={styles.r1}>{contest.prize}</h4>
              <h4 style={styles.r2}>For {contest.winners} winners</h4>
            </div>
          </div> 
          <div style={styles.contentdiv}>
            <h4>{contest.likes} likes</h4>
            <div style={styles.content2}>
              <h4>{contest.title}</h4>
              <p style={isTruncated[index] ? styles.para : styles.fullPara}>
                {contest.description}
              </p>
              <p style={styles.more} onClick={() => toggleTruncate(index)}>
                {isTruncated[index] ? 'more' : 'less'}
              </p>           
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    textAlign: 'center',
    margin: 'auto',
  },
  content: {
    textAlign: 'left',
    marginBottom: 40,
  },
  user: {
    padding: 10,
    display: 'flex',
    gap: '20px'
  },
  logoimage: {
    marginTop: '10px',
    borderRadius: '50%',
    width: '40px',
    height: '40px'
  },
  icons: {
    width: '30px',
    height: '30px',
    marginLeft: '10px',
    marginTop: '10px'
  },
  contestimg: {
    width: '100%',
  },
  likeprize: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rightdiv: {
    textAlign: 'right',
    lineHeight: '5px',
    paddingRight: 10
  },
  r1: {
    color: 'red',
  },
  r2: {
    color: 'skyblue',
  },
  contentdiv: {
    marginTop: '-70px',
    padding: 10,
  },
  content2: {
    marginTop: '-20px',
  },
  para: {
    marginTop: '-20px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  fullPara: {
    marginTop: '-20px',
    display: 'block',
  },
  more: {
    marginTop: '-16px',
    color: 'blue',
    cursor: 'pointer',
  },
  selectedCategory: {
    color: 'blue',
    cursor: 'pointer',
  },
  category: {
    cursor: 'pointer',
  },
};
