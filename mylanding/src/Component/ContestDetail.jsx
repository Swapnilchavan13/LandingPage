import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/customStyles.css';

export const ContestDetail = () => {
  const [contest, setContest] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page when component mounts

    // Fetch contest data from the API
    axios.get(`http://localhost:3005/games/${id}`)
      .then(response => setContest(response.data))
      .catch(error => console.error('Error fetching contest:', error));
  }, [id]);

  if (!contest) {
    return <p>Loading...</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.user}>
        <img style={styles.logoimage} src={contest.logo} alt={contest.organizerName} />
        <h3>{contest.organizerName}</h3>
        </div>

        <Slider {...settings}>
          {contest.images.map((image, idx) => (
            <div key={idx}>
              <img style={styles.contestimg} src={image} alt={contest.title} />
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
        <div id='contestform' style={styles.contentdiv}>
          <h4>{contest.likes} likes</h4>
          <div style={styles.content2}>
            <h4>{contest.title}</h4>
            <p style={styles.fullPara}>
              {contest.description}
            </p>
          </div>
          <h4>1st Place - ₹ 50,000</h4>
          <h4>2nd Place - ₹ 30,000</h4>
          <h4>3rd Place - ₹ 20,000</h4>
          <div>
            <h3 style={styles.fillform}>Fill in your details and register now!</h3>
            <input placeholder='Your Full Name' type="text" />
            <div style={styles.inputdiv}>
              <input type="text" placeholder='Age' />
              <select className="custom-select">
                <option value="" disabled selected>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <input placeholder='Phone Number' type="tel" />
            <input placeholder='Your Pet`s Name' type="text" />
            <input placeholder='What Kind of Pet do you have?' type="text" />
            <textarea
              className="text-area"
              placeholder="Write something about you and your animal friend and let us know why you are going to win!"
            />
          </div>
          <button style={styles.btn}>REGISTER</button>

          <Link to={`/cashbackfro`}> {/* Navigate to detailed view */}  
            <button style={styles.btn}>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
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
    marginTop: '-30px',
    padding: 10,
  },
  content2: {
    marginTop: '-20px',
  },
  fullPara: {
    marginTop: '-20px',
    display: 'block',
  },
  fillform: {
    color:'red',
  },
  inputdiv: {
    display: 'flex',
    gap: 10,
  },
  btn: {
    borderRadius: '8px',
    marginTop: '20px',
    width: '100%',
  }
};
