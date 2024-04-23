import React, { useState } from 'react';
import '../styles/vans.css'; // Import the CSS file

export const Vanswer = () => {
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
    // Check if all questions are answered
    if (selectedAnswers.question1 && selectedAnswers.question2 && selectedAnswers.question3) {
      // Logic to handle form submission goes here
      alert('Answers submitted:', selectedAnswers);
    } else {
      alert('Please answer all questions.');
    }
  };

  return (
    <div className="survey-container">
      <h2 className="survey-title">Watch the video and answer the questions:</h2>
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
          <button className={`option ${selectedAnswers.question2 === "option2" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option2')}>Option 2: Lipstik</button>
          <button className={`option ${selectedAnswers.question2 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question2', 'option3')}>Option 3: Nail Polish</button>
        </div>
      </div>
      <div className="question-container">
        <p className="question">Question 3: What is your overall opinion of the video?</p>
        <div className="options">
          <button className={`option ${selectedAnswers.question3 === "option1" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option1')}>Option 1: Very Good</button>
          <button className={`option ${selectedAnswers.question3 === "option2" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option2')}>Option 2: Good</button>
          <button className={`option ${selectedAnswers.question3 === "option3" && "selected"}`} onClick={() => handleAnswerSelection('question3', 'option3')}>Option 3: Bad</button>
        </div>
      </div>
      {/* Submit Button */}
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
