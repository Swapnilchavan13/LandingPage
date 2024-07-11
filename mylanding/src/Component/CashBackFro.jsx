import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/customStyles.css';

const contestData = [
  {
    id: 1,
    title: 'Pet Dressing Contest',
    likes: 20,
    description: 'Get ready to unleash your creativity and dress up your pets in the most adorable and unique costumes. Our Pet Dressing Contest invites all pet owners to showcase their furry friends in cute, stylish, and safe outfits. Whether it’s a superhero cape, a princess gown, or a hilarious costume, let your imagination run wild. Join us for a fun-filled event where every pet gets to shine and make a lasting impression. Exciting prizes await the most creative and charming outfits!',
    prize: '₹ 1 Lakh',
    winners: 5,
    images: ['dogshow.jpeg', 'https://m.media-amazon.com/images/I/513V0rQ2tCL._AC_UF1000,1000_QL80_.jpg', 'https://i.pinimg.com/564x/35/9b/51/359b5112b444e4c27109fad8962389c7.jpg'],
  },
  {
    id: 2,
    title: 'Fancy Dress Contest',
    likes: 30,
    description: 'Step into the spotlight and dazzle us with your creativity at our Fancy Dress Contest! This is your chance to express yourself through elaborate and imaginative costumes that showcase your personality and flair. Whether you opt for a classic character, a whimsical creation, or an innovative ensemble, we want to see it all. Join us for an entertaining event where participants of all ages can strut their stuff and compete for fabulous prizes. Don’t miss out on this opportunity to shine and have fun!',
    prize: '₹ 1 Lakh',
    winners: 5,
    images: ['fancydress.png', 'fancydress.png', 'fancydress.png'],
  },
  {
    id: 3,
    title: 'Chess Competition',
    likes: 40,
    description: 'Calling all chess enthusiasts! Our Chess Competition is the ultimate test of strategy, skill, and mental agility. Challenge yourself against top players and prove your prowess in this intellectually stimulating event. Whether you’re a seasoned grandmaster or an aspiring player, this competition offers a platform to showcase your strategic thinking and compete for top honors. With a thrilling atmosphere and high stakes, it’s time to make your move and aim for the championship!',
    prize: '₹ 1 Lakh',
    winners: 5,
    images: ['chess.png', 'chess.png', 'chess.png'],
  },
  {
    id: 4,
    title: 'Gaming Tournament',
    likes: 50,
    description: 'Gear up for the ultimate Gaming Tournament where gamers from all corners come together to battle it out in the most exciting and challenging games. This is not just a competition; it’s a celebration of gaming culture, skills, and strategies. From high-octane action games to strategic challenges, showcase your gaming prowess and vie for the top spot. With impressive prizes and intense matches, this tournament promises to be an electrifying experience for players and spectators alike!',
    prize: '₹ 1 Lakh',
    winners: 5,
    images: ['game.png', 'game.png', 'game.png'],
  }
];


export const CashBackFro = () => {
  const [isTruncated, setIsTruncated] = useState(contestData.map(() => true));

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

  return (
    <div style={styles.container}>
       {contestData.map((contest, index) => (
        <div
          key={contest.id}
          style={{
            ...styles.content,
            marginTop: index === 0 ? '0' : '-60px', // Adjust margin here
          }}
        >

          <div style={styles.user}>
            <img style={styles.logoimage} src="Localite_icon.png" alt="Localite Icon" />
            <h3>Localite</h3>
          </div>

          <Slider {...settings}>
            {contest.images.map((image, idx) => (
              <div key={idx}>
                <Link to={`/contest/${contest.id}`}> {/* Navigate to detailed view */}
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
};
