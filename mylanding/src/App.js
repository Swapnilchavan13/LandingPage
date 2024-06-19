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
import { CashBackFro } from './Component/CashBackFro';
// import { QrScanner } from './Component/QrScanner';
import { QrScannerComponent } from './Component/QrScanner';
import { LikeButton } from './Component/Like';
import { Researchdataentry } from './Component/Researchdataentry';
import { Alldata } from './Component/Alldata';



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
        <Route path="/cashbackfro" element={<CashBackFro />} />
        <Route path="/qrscanner" element={<QrScannerComponent />} />
        <Route path="/like" element={<LikeButton />} />
        <Route path="/research" element={<Researchdataentry />} />
        <Route path="/alldata" element={<Alldata />} />


    </Routes>
  </BrowserRouter>
  );
}

export default App;
