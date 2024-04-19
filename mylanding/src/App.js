import './App.css';
import { ClickerInfo } from './Component/ClickerInfo';
import EmailVerification from './Component/Email';
import OTPForm from './Component/OtpForm';
import { RegistrationForm } from './Component/RegistrationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/clicker" element={<ClickerInfo />} />
        <Route path="/otp" element={<OTPForm />} />
        <Route path="/email" element={<EmailVerification />} />


    </Routes>
  </BrowserRouter>
  );
}

export default App;
