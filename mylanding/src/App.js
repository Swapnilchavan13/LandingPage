import './App.css';
import { ClickerInfo } from './Component/ClickerInfo';
import OTPForm from './Component/OtpForm';
import { RegistrationForm } from './Component/RegistrationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Survey } from './Component/Survey';
// import { Vanswer } from './Component/Vanswer';
// import { Ianswer } from './Component/Ianswer';
// import { Success } from './Component/Success';
// import { WalletDetails } from './Component/WalletDetails';
// import { GameCms } from './Component/GameCms';
import { CashBackFro } from './Component/CashBackFro';
// import { LikeButton } from './Component/Like';
import { Researchdataentry } from './Component/Researchdataentry';
import { Alldata } from './Component/Alldata';
import { RegisterActivate } from './Component/RegisterActivate';
// import { ContestDetail } from './Component/ContestDetail';
// import UpdateGame from './Component/UpdateGame';
// import AddGame from './Component/AddGame';
// import GameList from './Component/GameList';
import ProtectedRoute from './Component/ProtectedRoute';
import { Login } from './Component/Login';
import { AuthProvider } from './Component/AuthContext';
import { MerchantRegistration } from './Component/MerchantRegistration';
import { Firstformdata } from './Component/Firstformdata';
import { AllUsers } from './Component/Allusers';
import { MerchantDetails } from './Component/MerchantDetails';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/clicker" element={<ClickerInfo />} />
          <Route path="/otp" element={<OTPForm />} />
          {/* <Route path="/survey" element={<Survey />} /> */}
          {/* <Route path="/vans" element={<Vanswer />} /> */}
          {/* <Route path="/ians" element={<Ianswer />} /> */}
          {/* <Route path="/success" element={<Success />} /> */}
          {/* <Route path="/wallet" element={<WalletDetails />} /> */}
          {/* <Route path="/gamecms" element={<GameCms />} /> */}
          <Route path="/cashbackfro" element={<CashBackFro />} />
          {/* <Route path="/like" element={<LikeButton />} /> */}
          <Route path="/alldata" element={<Alldata />} />
          <Route path="/allregisters" element={<RegisterActivate />} />
          {/* <Route path="/addgame" element={<AddGame />} /> */}
          {/* <Route path="/gamelist" element={<GameList />} /> */}
          {/* <Route path="/contest/:id" element={<ContestDetail />} /> */}
          {/* <Route path="/update/:id" element={<UpdateGame />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/merchantregistration" element={<MerchantRegistration />} />

          <Route path="/merchantdetails" element={<MerchantDetails />} />


          <Route path="/allusers" element={<AllUsers />} />


          <Route path="/firstformdata" element={<Firstformdata />} />

          <Route path="/research" element={<ProtectedRoute element={<Researchdataentry />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
