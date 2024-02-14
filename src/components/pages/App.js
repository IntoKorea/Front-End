
import { Route, Routes } from "react-router-dom";
import Main from "./main";
import ToursListApi from "./tours/toursListApi";

import MyPage from "./mypage/MyPage";
import QnA from "./mypage/QnA";
import Question from "./mypage/Question";
import History from "./mypage/History";
import Keep from "./mypage/Keep";
import Traveldiary from "./mypage/TravelDiary";
import EditQuestion from "./mypage/EditQuestion";
import QnAdetail from "./mypage/QnAdetail";
import React from "react";



import CheckData from "./tours/zcheckAndTest/checkData";
import TourDetailPageApi from "./tourDetailPage/tourDetailPageApi";
import EditDiary from "./mypage/EditDiary";
import DiaryDetail from "./mypage/DiaryDetail";

function App() {
  return (
    <Routes>
      <Route index element={<Main />}/>

      <Route path="/toursMain" element={<ToursListApi />}/>
      <Route path="/Mypage" element={<MyPage/>} />
      <Route path="/QnA" element={<QnA />} />
      <Route path="/Question" element={<Question />} />
      <Route path="/History" element={<History />} />
      <Route path="/Keep" element={<Keep />} />
      <Route path="/Traveldiary" element={<Traveldiary/>}/>
      <Route path="/EditQuestion" element={<EditQuestion/>}/>
      <Route path="/QnAdetail" element={<QnAdetail/>}/>
      <Route path="/EditDiary" element={<EditDiary/>} />
      <Route path="/DiaryDetail" element={<DiaryDetail/>} />

      <Route path="/toursMain" element={<ToursListApi />}></Route>
      <Route path="/checkData" element={<CheckData />}></Route>
      <Route path="/tourDetail" element={<TourDetailPageApi/>}></Route>

    </Routes>
  );
}

export default App;
