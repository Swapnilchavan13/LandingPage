import React, { useState, useEffect } from 'react';
import '../styles/vans.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

export const Vanswer = () => {
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
      if (selectedAnswers.question2 === "option2") totalPoints += 50;
      if (selectedAnswers.question3 === "option3") totalPoints += 50;
  
      try {
        // Make API call to update wallet with earned points
        const walletResponse = await fetch(`http://97.74.94.109:4020/updateWallet/${userId}`, {
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
        const transactionResponse = await fetch(`http://97.74.94.109:4020/newTransaction/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ points: totalPoints, activityID: 1 }) // Assuming activityID for answering questions is 1
        });
        if (!transactionResponse.ok) {
          throw new Error('Failed to add transaction details');
        }
  
        alert(`Answers submitted successfully! You have earned ${totalPoints} points.`);
        navigate(`/success?userid=${userId}`); // Navigate to success page with userId query parameter
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit answers. Please try again later.');
      }
    } else {
      alert('Please answer all questions.');
    }
  };
  

  return (
    <div className="survey-container">
      <div className='sdiv'>
        <h3 className="survey-title">WATCH THE VIDEO AND ANSWER THE QUESTIONS:</h3>
      </div>
      <div className="video-container">
        {/* Replace the videoURL with your actual video URL */}
        <iframe width="100%" height="215" src="https://www.youtube.com/embed/ZNPEgRIEkBY?si=0ekd7vZRbC5gFYuA" title="Embedded Video" allowFullScreen></iframe>
      </div>
      <div className="question-container">
        <p className="question">Question 1: Who is the actress in the video?</p>
        <div className="options">
          <button className={`option ${selectedAnswers.question1 === "option1" && "selected"}`} onClick={() => handleAnswerSelection('question1', 'option1')}>Option 1: Alia Bhatt</button>
          <button className={`option ${selectedAnswers.question1 === "option2" && "selected"}`} onClick={() => handleAnswerSelection('question1', 'option2')}>Option 2: Tamannaah Bhatia</button>
          <button className={`option ${selectedAnswers.question1 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question1', 'option3')}>Option 3: Taapsee Pannu</button>
        </div>
      </div>
      <div className="question-container">
        <p className="question">Question 2: What is the product shown in the video?</p>
        <div className="options">
          <button className={`option ${selectedAnswers.question2 === "option1" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option1')}>Option 1: Eyeliner</button>
          <button className={`option ${selectedAnswers.question2 === "option2" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option2')}>Option 2: Lipstick</button>
          <button className={`option ${selectedAnswers.question2 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option3')}>Option 3: Nail Polish</button>
        </div>
      </div>
      <div className="question-container">
        <p className="question">Question 3: Who is the actor in the video?</p>
        <div className="options">
          <button className={`option ${selectedAnswers.question3 === "option1" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option1')}>Option 1: Ramcharan</button>
          <button className={`option ${selectedAnswers.question3 === "option2" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option2')}>Option 2: Randeep Hooda</button>
          <button className={`option ${selectedAnswers.question3 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option3')}>Option 3: Ranveer Singh</button>
        </div>
      </div>
      {/* Submit Button */}
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
