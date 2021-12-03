import { useQuery } from "react-query";
import { fetchCoinHistory } from "../../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

const Container = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.theme.lightCardBg};
`;

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <Container>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => price.volume),
              },
            ]}
            options={{
              theme: {
                mode: "light",
              },
              chart: {
                height: 300,
                width: 480,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: true },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: true },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        </Container>
      )}
    </div>
  );
}

export default Chart;
