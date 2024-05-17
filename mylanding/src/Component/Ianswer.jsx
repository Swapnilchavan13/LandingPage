import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../styles/ians.css'; // Import the CSS file
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

export const Ianswer = () => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extract the userid from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userid = urlParams.get('userid');
    setUserId(userid);
  }, []);

  const handleAnswerSelection = (question, option) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [question]: option
    }));
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (selectedAnswers.question1 && selectedAnswers.question2 && selectedAnswers.question3) {
      // Logic to calculate points based on answers
      let totalPoints = 0;
      if (selectedAnswers.question1 === "option2") totalPoints += 50;
      if (selectedAnswers.question2 === "option1") totalPoints += 50;
      if (selectedAnswers.question3 === "option3") totalPoints += 50;

      try {
        // Make API call to update wallet with earned points
        const walletResponse = await fetch(`http://97.74.94.109:4121/updateWallet/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ points: totalPoints }) // Adding earned points
        });
        if (!walletResponse.ok) {
          throw new Error('Failed to update wallet');
        }

        // Make API call to add transaction details
        const transactionResponse = await fetch(`http://97.74.94.109:4121/newTransaction/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ points: totalPoints, activityID: 1 }) // Assuming activityID for answering image questions is 6
        });
        if (!transactionResponse.ok) {
          throw new Error('Failed to add transaction details');
        }

        alert(`Answers submitted successfully! You have earned ${totalPoints} points.`);
        navigate('/success'); // Navigate to success page
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit answers. Please try again later.');
      }
    } else {
      alert('Please answer all questions.');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true // Enable swiping to slide
  };

  return (
    <div className="survey-container">
      <div className='sdiv'>
        <h3 className="survey-title">Watch the images and answer the questions:</h3>
      </div>
      <Slider className='slider' {...settings}>
        <div> 
          <img src="https://sslimages.shoppersstop.com/sys-master/images/h7a/hf8/17410469101598/SS19SG700133VR_bas_03_RUST_LUST_alt1.jpg_1000Wx1500H" alt="Image 1" />
        </div>
        <div>
          <img src="https://www.adgully.com/img/800/202302/jovees-herbal.png.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="https://i.pinimg.com/736x/f8/f6/82/f8f68200cbcaeea5326ff1c4de75b9d5.jpg" alt="Image 3" />
        </div>
      </Slider>
      <br />
      <div className="question-container">
        <p className="question">Question 1: Who is the actress in the second image?</p>
        <div className="options">
          <button className={`option ${selectedAnswers.question1 === "option1" && "selected"}`} onClick={() => handleAnswerSelection('question1', 'option1')}>Option 1: Vidya Balan</button>
          <button className={`option ${selectedAnswers.question1 === "option2" && "selected"}`} onClick={() => handleAnswerSelection('question1', 'option2')}>Option 2: Parineeti Chopra</button>
          <button className={`option ${selectedAnswers.question1 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question1', 'option3')}>Option 3: Disha Patani</button>
        </div>
      </div>
      <div className="question-container">
        <p className="question">Question 2: What is the product shown in the First image?</p>
        <div className="options">
          <button className={`option ${selectedAnswers.question2 === "option1" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option1')}>Option 1: Eye Liner</button>
          <button className={`option ${selectedAnswers.question2 === "option2" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option2')}>Option 2: Lip Liner</button>
          <button className={`option ${selectedAnswers.question2 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option3')}>Option 3: Lipstick</button>
        </div>
      </div>
      <div className="question-container">
        <p className="question">Question 3: Who is the actress in the third image?</p>
        <div className="options">
          <button className={`option ${selectedAnswers.question3 === "option1" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option1')}>Option 1: Katrina Kaif</button>
          <button className={`option ${selectedAnswers.question3 === "option2" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option2')}>Option 2: Shraddha Kapoor</button>
          <button className={`option ${selectedAnswers.question3 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option3')}>Option 3: Shruti Haasan</button>
        </div>
      </div>
      {/* Submit Button */}
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
