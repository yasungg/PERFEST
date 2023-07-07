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

import Festival from "./pages/Festival";
import FestivalDetail from "./pages/FestivalDetail";
import SideBar from "./pages/Sidebar";
import MyCalendar from "./pages/MyCalender";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/MyPage" element={<MyPage />} />
        {/* sidebar 테스트용 수정예정/ */}
        <Route path="/Sidebar" element={<SideBar />} /> 
        <Route path="/MyRanking" element={<MyRanking />} />
        <Route path="/Setting" element={<MySetting />} />
        <Route path="/MyReview" element={<MyReview />} />
        <Route path="/ReserveList" element={<MyReserveList />} />
        <Route path="/PayList" element={<MyPayList />} />
        <Route path="/MyWrite" element={<MyWrite />} />
        <Route path="/payready" element={<PayReady />} />
        <Route path="/payresult" element={<PayResult />} />
        <Route path="/paycancel" element={<PayCancel />} />
        <Route path="/resultFail" element={<ResultFalse />} />
        <Route path="/resultSuccess" element={<ResultSuccess />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/WriteBoard" element={<WriteBoard />} />
        <Route path="/UpdateBoard" element={<UpdateBoard />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/BoardArticle/:communityId" element={<BoardArticle />} />
        <Route path="/Festival" element={<Festival />} />
        <Route path="/FestivalDetail" element={<FestivalDetail />} />
        <Route path="/MyCalender" element={<MyCalendar />} />

      </Routes>
    </Router>
  );
}

export default App;
