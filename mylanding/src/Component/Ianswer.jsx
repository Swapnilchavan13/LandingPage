import React, { useState } from 'react';
import Slider from 'react-slick';
import '../styles/ians.css'; // Import the CSS file
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Ianswer = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });

  const handleAnswerSelection = (question, option) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [question]: option
    }));
  };

  const handleSubmit = () => {
    // Logic to handle form submission goes here
    alert('Answers submitted:', selectedAnswers);
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
      <h2 className="survey-title">Watch the images and answer the questions:</h2>
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
          <button className={`option ${selectedAnswers.question2 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option3')}>Option 3: Lipstik</button>

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
