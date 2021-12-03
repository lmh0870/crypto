import { useLocation, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.lightAccent};
  font-size: 48px;
  text-align: center;
  margin: 24px;
`;
const Overview = styled.div`
  background-color: ${(props) => props.theme.lightCardBg};
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  border-radius: 8px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
`;
const Description = styled.div`
  margin: 24px 0;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 16px 0;
`;
const Tab = styled.span<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.lightCardBg};
  color: ${(props) =>
    props.isActive ? props.theme.lightAccent : props.theme.lightText};
  font-weight: ${(props) => (props.isActive ? 600 : 300)};
  border-radius: 8px;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  a {
    padding: 8px 0px;
    display: block;
  }
`;

export default function Default() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  console.log(coinId);
  console.log(state);
  return (
    <Container>
      <Title>Bitcoin</Title>
      <Overview>
        <OverviewItem>
          <span>rank:</span>
          <span>2</span>
        </OverviewItem>
        <OverviewItem>
          <span>symbol:</span>
          <span>2</span>
        </OverviewItem>
        <OverviewItem>
          <span>price:</span>
          <span>2</span>
        </OverviewItem>
      </Overview>
      <Description>Desc</Description>
      <Overview>
        <OverviewItem>
          <span>total suply:</span>
          <span>1</span>
        </OverviewItem>
        <OverviewItem>
          <span>max supply:</span>
          <span>2</span>
        </OverviewItem>
      </Overview>
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </Tab>
      </Tabs>
    </Container>
  );
}
