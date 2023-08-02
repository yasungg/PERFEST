import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import MyRanking from "./pages/MyRanking";
import MySetting from "./pages/MySetting";
import MyReview from "./pages/MyReview";
import MyReserveList from "./pages/MyReserveList";
import MyPayList from "./pages/MyPayList";
import MyWrite from "./pages/MyWrite";
import Board from "./pages/Board";
import WriteBoard from "./pages/WriteBoard";
import Ranking from "./pages/Ranking";
import UpdateBoard from "./pages/UpdateBoard";
import BoardArticle from "./pages/BoardArticle";
import { PayCancel, PayReady, PayResult } from "./pages/Payments";
import ResultFalse from "./pages/PayResultFalse";
import ResultSuccess from "./pages/PaySuccess";
import UserStore from "./context/UserStore";
import Festival from "./pages/Festival";
import FestivalDetail from "./pages/FestivalDetail";
import SideBar from "./pages/Sidebar";
import Calendar from "./pages/Calender.js";
import Review from "./pages/Review";
import Admin from "./pages/Admin";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <UserStore>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/login" element={<Login />} />
          <Route path="/pages/mypage" element={<MyPage />} />
          <Route path="/pages/myranking" element={<MyRanking />} />
          <Route path="/pages/setting" element={<MySetting />} />
          <Route path="/pages/myreview" element={<MyReview />} />
          <Route path="/pages/reservelist" element={<MyReserveList />} />
          <Route path="/pages/paylist" element={<MyPayList />} />
          <Route path="/pages/mywrite" element={<MyWrite />} />
          <Route path="/pages/payready" element={<PayReady />} />
          <Route path="/pages/payresult" element={<PayResult />} />
          <Route path="/pages/paycancel" element={<PayCancel />} />
          <Route path="/pages/resultFail" element={<ResultFalse />} />
          <Route path="/pages/resultSuccess" element={<ResultSuccess />} />
          <Route path="/pages/board" element={<Board />} />
          <Route path="/pages/writeboard" element={<WriteBoard />} />
          <Route path="/pages/updateboard/:communityId" element={<UpdateBoard />} />
          <Route path="/pages/ranking" element={<Ranking />} />
          <Route
            path="/pages/boardarticle/:communityId"
            element={<BoardArticle />}
          />
          <Route path="/pages/festival" element={<Festival />} />
          <Route
            path="/pages/festivaldetail/:id"
            element={<FestivalDetail />}
          />
          <Route path="/pages/Calender" element={<Calendar />} />
          <Route path="/pages/review" element={<Review />} />
          <Route path="/pages/Admin" element={<Admin />} />
          <Route path="/pages/Timeline" element={<Timeline />} />
        </Routes>
      </Router>
    </UserStore>
  );
}

export default App;
