import React, { createRef, useEffect, useState } from "react";

import { Grid } from "semantic-ui-react";

import Chart from "chart.js/auto";

export default function ChartSegment({
  userData,
  id,
  itemLeft,
  itemRight,
  centerItem,
}) {
  const chartRef = createRef();
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef.current && userData) {
      const myTournamentChartRef = chartRef.current.getContext("2d");
      const data = {
        labels: [itemLeft.title, itemRight.title],
        datasets: [
          {
            label: `${itemLeft.title}/${itemRight.title}`,
            data: [itemLeft.value, itemRight.value],
            backgroundColor: [itemLeft.color, itemRight.color],
            hoverOffset: 0,
          },
        ],
      };

      const config = {
        type: "doughnut",
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          cutout: "80%",
        },
        data: data,
      };

      if (chartInstance) {
        // Chart has already been initialized, update it rather than create a new one
        chartInstance.data = data;
        chartInstance.update();
      } else {
        // Chart is being initialized for the first time
        setChartInstance(new Chart(myTournamentChartRef, config));
      }
    }
  }, [userData]);
  return (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column>
          <canvas ref={chartRef} />
          {centerItem != null ? (
            <div
              style={{
                textAlign: "center",
                position: "absolute",
                top: "50%",
                bottom: "50%",
                left: "50%",
                right: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 30,
                    padding: 10,
                    fontWeight: "bolder",
                  }}
                >
                  {centerItem.top}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    marginTop: 2,
                    color: "grey",
                  }}
                >
                  {centerItem.bottom}
                </div>
              </div>
            </div>
          ) : null}
        </Grid.Column>
        <Grid.Column>
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Grid stretched style={{ width: "100%" }}>
              <Grid.Row columns="equal" stretched textAlign="center">
                <Grid.Column>
                  <div
                    style={{
                      color: itemLeft.color,
                      fontSize: 28,
                      fontWeight: "bolder",
                      padding: "10px 0",
                    }}
                  >
                    {itemLeft.value}
                  </div>
                  <div style={{ color: "grey" }}>{itemLeft.title}</div>
                </Grid.Column>
                <Grid.Column>
                  <div
                    style={{
                      color: itemRight.color,
                      fontSize: 28,
                      fontWeight: "bolder",
                      padding: "10px 0",
                    }}
                  >
                    {itemRight.value}
                  </div>
                  <div style={{ color: "grey" }}>{itemRight.title}</div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
