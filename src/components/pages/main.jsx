import { Link } from "react-router-dom";

const Main = () => {

    return (
        <>
            <h2>메인페이지입니다</h2>
            <Link to="toursMain">여행지 보기 </Link>
            <Link to="Mypage">마이페이지</Link>
        </>
    )
}


export default Main;