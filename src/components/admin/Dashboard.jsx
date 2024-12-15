import React, { useEffect, useMemo, useState } from 'react';
import fetchData from '../../util/DataFetcher.js';
import { getFormattedPrice } from '../../util/appUtil.js';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalIncomeByMonth, setTotalIncomeByMonth] = useState([]);

  const dashboardElements = [
    { id: 'totalProducts', title: 'Total Products', endpoint: 'products/count', setter: setTotalProducts, value: totalProducts },
    { id: 'totalIncome', title: 'Total Income', endpoint: 'orders/income', setter: setTotalIncome, value: `₹${getFormattedPrice(totalIncome)}` },
    { id: 'totalCategories', title: 'Total Categories', endpoint: 'categories/count', setter: setTotalCategories, value: totalCategories },
    { id: 'totalOrders', title: 'Total Orders', endpoint: 'orders/count', setter: setTotalOrders, value: totalOrders },
    { id: 'totalCustomers', title: 'Total Customers', endpoint: 'customers/count', setter: setTotalCustomers, value: totalCustomers }
  ];

  useEffect(() => {
    // Fetch all metrics for the dashboard
    dashboardElements.forEach((element) => {
      fetchData(
        element.endpoint,
        (data) => startCountLoadingAnimation(data, element.setter),
        (error) => console.error(error)
      )
    });
    fetchData(
      'orders/income-by-month',
      (data) => {
        data.map((dataElement) => {
          dataElement.date = new Date(dataElement.date).toDateString()
            .split(' ')[1]
            .concat(' ')
            .concat(new Date(dataElement.date).getFullYear());
          return { x: String(dataElement.date), y: dataElement.income }
        });
        setTotalIncomeByMonth(data);
      },
      (error) => console.error(error)
    );
  }, []);

  const startCountLoadingAnimation = (countValue, valueSetter) => {
    let count = 0;
    let animationDuration = 2000;
    const increment = Math.max(1, Math.floor(countValue / (animationDuration / 10))); // Calculate the increment value
    const timing = Math.max(1, Math.floor(animationDuration / (countValue / increment))); // Calculate the interval timing

    const interval = setInterval(() => {
      count += increment;
      if (count >= countValue) {
        count = countValue;
        clearInterval(interval);
      }
      valueSetter(count);
    }, timing);
  }

  const voronoiContainer = useMemo(() => (
    <VictoryVoronoiContainer
      labels={({ datum }) => `₹${getFormattedPrice(datum.y)}`}
    />
  ), []);

  return (
    <div className="container rounded bg-secondary-subtle">
      <h3 className="text-center mb-5">Dashboard</h3>
      <div className="row justify-content-between">
        {dashboardElements.map((element, index) => (
          <div key={element.id} className={`col-sm-6 col-xl-4 mb-3
            ${element.id == 'totalIncome' || element.id == 'totalOrders' ? 'col-xxl-3' : 'col-xxl-2'}`}>
            <div className={`card text-white pt-1
              ${index % 2 == 0 ? 'bg-primary' : 'bg-secondary'}`
            }>
              <div className="card-body pb-2">
                <h1 className="card-text">{element.value}</h1>
                <h6 className="card-title text-nowrap mt-2">{element.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chart bg-light rounded w-md-75 mx-auto mt-4 mb-3">
        <h4 className="text-center pt-4 text-dark text-uppercase">Total Income By Month</h4>
        <VictoryChart
          containerComponent={voronoiContainer}
          labelComponent={
            <VictoryTooltip
              pointerOrientation="bottom"
              dy={-5}
              dx={0}
              pointerWidth={5}
              flyoutHeight={25}
              flyoutWidth={25}
              cornerRadius={0}
              centerOffset={{ x: -0 }}
              style={{ fill: "black" }}
            />
          }
          colorScale={'warm'}
          width={500}
          height={250}
          animate={{ duration: 3000, easing: "bounce" }}
          title='Total Income'
          theme={VictoryTheme.material}
          padding={{ top: 10, bottom: 60, left: 80, right: 20 }}
          domainPadding={{ y: 30, x: 30 }}
        >
          <VictoryLine
            data={totalIncomeByMonth.map((data) => {
              data.date = new Date(data.date).toDateString()
                .split(' ')[1]
                .concat(' ')
                .concat(new Date(data.date).getFullYear());
              return { x: String(data.date), y: data.income }
            })}
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
            animate={{
              duration: 3000,
              onLoad: { duration: 1000 }
            }}
          />
          <VictoryAxis
            animate={true}
            style={{
              tickLabels: { fill: "grey" },
              axis: { stroke: 'grey' },
              grid: { stroke: "lightgrey" }
            }}
          />
          <VictoryAxis
            animate={true}
            dependentAxis
            style={{
              tickLabels: { fill: "grey" },
              axis: { stroke: 'grey' },
              grid: { stroke: "lightgrey" },
            }}
          />
        </VictoryChart>
      </div>

    </div>
  );
};

export default Dashboard;