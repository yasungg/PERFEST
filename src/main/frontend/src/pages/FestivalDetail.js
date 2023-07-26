import React from "react";
import styled from "styled-components";
import { Container } from "../components/StandardStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchSideBar from "../components/SearchSideBar";
import FestivalAPI from "../api/FestivalAPI";
import { useParams } from "react-router";

const BodyContainer = styled.div``;

const FestivalDetail = () => {
  const { id } = useParams();
    const [festivalDetail, setFestivalDetail] = useState([]);


    useEffect(() => {
        const getFestivalDetail = async() => {
            const response = await FestivalAPI.getFestivalByFestivalId(id);
            console.log(response.data);
            setFestivalDetail(response.data);
        }
        getFestivalDetail();
    },[festivalId]);
  return (
    <Container>
      <Header />
      <BodyContainer>
        <SearchSideBar />
      </BodyContainer>
    </Container>
  );
};
export default FestivalDetail;
