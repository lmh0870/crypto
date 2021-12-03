import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";

const Wrapper = styled.div``;
const Banner = styled.div`
  text-align: center;
  font-size: 64px;
  margin: 32px;
`;
const CoinList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: white;
  font-size: 24px;
  width: 400px;
  border-radius: 8px;
  margin-bottom: 16px;
`;
const CoinImage = styled.img`
  width: 24px;
  margin: 12px;
`;
const CoinName = styled.div``;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
export default function Default() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  return (
    <Wrapper>
      <Banner>Coins</Banner>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Link
              to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}
            >
              <Coin>
                <CoinImage
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <CoinName>{coin.name}</CoinName>
              </Coin>
            </Link>
          ))}
        </CoinList>
      )}
    </Wrapper>
  );
}
