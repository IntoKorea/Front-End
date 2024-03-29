import CallAPI from "components/ui/callAPI";
import { useEffect, useState } from "react";
import SearchFestivalPage from "./searchFestivalPage";
import TourHeader from "../tourHeader";
import TourItem from "../touritem";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import AreaCode from "../areaCode1/areaCode";
import DetailAreaCode from "../areaCode1/detailAreaCode";

const SearchFestivalBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    h2 {
        color: black;
        font-weight: bold;
    }

    a {
        text-decoration: none;
    }

    p {
        color: silver;
    }

    .listBox {
        margin-top: 8em;
        
    }

    .codeBox {
        padding: 20px; /* 안쪽 여백 설정 */
        margin-bottom: 20px; /* 하단 여백 설정 */
        display: flex;
        flex-direction: column;
        // background-color: silver;
    }

    .codeBox .blockBox {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
    }

    .codeBox button:hover {
        background-color: #0056b3; /* 호버 시 배경색 변경 */
    }
`;


const PaginationBox = styled.div`
    .pagination { 
        display: flex; 
        // justify-content: center; 
        margin-top: 15px;
    }
    ul { list-style: none; padding: 0; }
    ul.pagination li {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #e2e2e2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem; 
    }
    ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
    ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
    ul.pagination li a { text-decoration: none; color: #337ab7; font-size: 1rem; }
    ul.pagination li.active a { color: white; }
    ul.pagination li.active { background-color: #337ab7; }
    ul.pagination li a:hover,
    ul.pagination li a.active { color: blue; }
`


const SearchFestival1 = () => {

    const [loading, setLoading] = useState(false);
    const [datas , setData] = useState(null);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState(1);
    const itemsCountPerPage = 10;

    const [areaCode , setAreaCode] = useState("") ;
    // 시군구 코드
    const [ showDetailAreaCode, setShowDetailAreaCode ] = useState("");
    const [ detailAreaCode, setDetailAreaCode ] = useState("");
    const filter = "행사/축제/공연"

    const today = new Date();
    const year = today.getFullYear();
    // 월은 0부터 시작하므로 1을 더해줍니다.
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    // 월과 일이 한 자리 수인 경우 앞에 0을 붙여줍니다.
    const formattedMonth = month < 10 ? `0${month}` : month;
    // const formattedDay = day < 10 ? `0${day}` : day;
    const formattedDay = "01";

    const fomattedToday = `${year}${formattedMonth}${formattedDay}`
    console.log(fomattedToday)

    useEffect(() => {
            const link = "searchFestival1";
            const param = `MobileOS=ETC&MobileApp=AppTest&_type=json&eventStartDate=${fomattedToday}&numOfRows=${itemsCountPerPage}&pageNo=${page}&areaCode=${areaCode}&sigunguCode=${detailAreaCode}`

            const fetchData = async() => {
                const response = await CallAPI(link, param ,setLoading)
                setData(response.data.response.body.items.item);
                setTotalData(response.data.response.body.totalCount)
                console.log(response)
    
            }
    
            fetchData();
    
    },[page, areaCode, detailAreaCode])

    const handlePageChange = ( page ) =>{ setPage(page)}

    const handleFilterArea = (data) => {

        setDetailAreaCode("");
        setAreaCode(data.code);
        setPage(1);

        console.log("체크: ",data)

        const renderDetailAreaCode = (areaCode, areaName) => {
            if (areaCode !== '') {
                return (
                    <div className="blockBox">
                        <DetailAreaCode
                            code={areaCode}
                            area={areaName}
                            onClick={handleFilterDetailArea}
                            />
                    </div>
                );
            } else {
                return null;
            }
        }

        setShowDetailAreaCode(renderDetailAreaCode(data.code, data.name));
    }

    
    const handleFilterDetailArea = (data) => {
        setDetailAreaCode(data.code)
        setPage(1);
    }

    // 대기 중일때
    if(loading){
        return <>대기중 ... </>;
    }

    // 아직 datas 값이 설정되지 않았을 때
    if(!datas){
        return (
            <SearchFestivalBlock>
                <div className="codeBox">
                    <div className="blockBox">
                        <AreaCode onClick={handleFilterArea}/>
                    </div>
                    {showDetailAreaCode}
                </div>
                <TourHeader totalCount={0} a={filter} />
            </SearchFestivalBlock>
        );
    }


    return (
        <SearchFestivalBlock>
            <div className="codeBox">
                <div className="blockBox">
                    <AreaCode onClick={handleFilterArea}/>
                </div>
                {showDetailAreaCode}
            </div>

            {/* 리스트 내용  */}
            <div className="listBox">

            <TourHeader totalCount={totalData} a={filter} />
                {datas.map((data, index) => (
                    <TourItem key={data.firstimage || index } data={data} />
                    ))}
    
            </div>
            {/* 페이징 */}
            <PaginationBox>
                <Pagination
                    // 현재 페이지
                    activePage={page}
                    // 페이지당 아이템 수
                    itemsCountPerPage={itemsCountPerPage}
                    // 
                    totalItemsCount={totalData}
                    // 표시할 페이지 수
                    pageRangeDisplayed={5}
                    // 함수
                    onChange={handlePageChange}>
                </Pagination>
            </PaginationBox>
        </SearchFestivalBlock>
    )


}


export default SearchFestival1;