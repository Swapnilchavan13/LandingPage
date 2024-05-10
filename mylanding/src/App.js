import './App.css';
import { ClickerInfo } from './Component/ClickerInfo';
import EmailVerification from './Component/Email';
import OTPForm from './Component/OtpForm';
import { RegistrationForm } from './Component/RegistrationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Survey } from './Component/Survey';
import { Vanswer } from './Component/Vanswer';
import { Ianswer } from './Component/Ianswer';
import { Success } from './Component/Success';
import { WalletDetails } from './Component/WalletDetails';
import { CashbackForm } from './Component/Cashbackdetails';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/clicker" element={<ClickerInfo />} />
        <Route path="/otp" element={<OTPForm />} />
        <Route path="/email" element={<EmailVerification />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/vans" element={<Vanswer />} />
        <Route path="/ians" element={<Ianswer />} />
        <Route path="/success" element={<Success />} />
        <Route path="/wallet" element={<WalletDetails />} />
        <Route path="/cashback" element={<CashbackForm />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
