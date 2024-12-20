'use client';

import { useState, useEffect } from 'react';
import { BarChart, Card, TextInput } from '@tremor/react';

function getNext12MonthNamesWithYear() {
  var now = new Date();
  var month = now.getMonth();
  var year = now.getFullYear();

  var names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
               'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  var res = [];
  for (var i = 0; i < 13; ++i) {
      res.push(names[month] + ' ' + year);
      if (++month === 12) {
          month = 0;
          ++year;
      }
  }
  return res;
}


function valueFormatter(number: number, compact: boolean = true) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    notation: compact ? 'compact' : 'standard',
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(number);
}
function getRevenueForecast(
  adSpend: number, 
  leadAcquisitionCost: number, 
  leadToUserConversionRate: number, 
  paidUserConversionRate: number, 
  chargePerUser: number
) {
  if (!adSpend || !leadAcquisitionCost || leadAcquisitionCost == 0 || !leadToUserConversionRate || !paidUserConversionRate || !chargePerUser) return 0;
  
  const numberOfLeads = adSpend / leadAcquisitionCost;
  const numberOfUsers = numberOfLeads * (leadToUserConversionRate / 100) * (paidUserConversionRate / 100);
  const revenue = numberOfUsers * chargePerUser;
  
  return revenue;
}
function getNextMonthRevenue(
  revenueFirstMonth: number,
  previousRevenue: number,
  churn_rate : number
) {
  return revenueFirstMonth + (previousRevenue * (1 - (churn_rate / 100)));
}

const dates = getNext12MonthNamesWithYear();

const data = [
  {
    date: dates[0],
    amount: 0
  },
  {
    date: dates[1],
    amount: 0
  },
  {
    date: dates[2],
    amount: 0
  },
  {
    date: dates[3],
    amount: 0
  },
  {
    date: dates[4],
    amount: 0
  },
  {
    date: dates[5],
    amount: 0
  },
  {
    date: dates[6],
    amount: 0
  },
  {
    date: dates[7],
    amount: 0
  },
  {
    date: dates[8],
    amount: 0
  },
  {
    date: dates[9],
    amount: 0
  },
  {
    date: dates[10],
    amount: 0
  },
  {
    date: dates[11],
    amount: 0
  },
];
export default function RevenueBarChart() {
  const [leadCost, setLeadCost] = useState<string>('');
  const [conversionRate, setConversionRate] = useState<string>('');
  const [adSpend, setAdSpend] = useState<string>('');
  const [paidConversionRate, setPaidConversionRate] = useState<string>('');
  const [chargePerUser, setChargePerUser] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [chartData, setChartData] = useState(data); // Initial data
  const [churnRate, setChurnRate] = useState<string>('');

  useEffect(() => {
    const newData = dates.reduce((acc, date, index) => {
      const amount = index === 0 
        ? getRevenueForecast(
            parseFloat(adSpend || '0'),
            parseFloat(leadCost || '0'),
            parseFloat(conversionRate || '0'),
            parseFloat(paidConversionRate || '0'),
            parseFloat(chargePerUser || '0')
          )
        : getNextMonthRevenue(
            acc[0].amount,
            acc[index - 1].amount,
            parseFloat(churnRate || '0')
          );
      
      acc.push({ date, amount });
      return acc;
    }, [] as { date: string; amount: number }[]);

    setChartData(newData);
  }, [leadCost, conversionRate, adSpend, paidConversionRate, chargePerUser, churnRate]);
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-7xl">
      <h3 className="ml-1 mr-1 font-semibold text-2xl text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Revenue Forecast
      </h3>
        
        <div className="mt-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
              Ad Spend
            </label>
            <TextInput
              placeholder="Enter ad spend"
              value={adSpend}
              onChange={(e) => setAdSpend(e.target.value)}
              type="number"
              min="0"
              step="0.01"
              icon={() => "$"}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
              Lead Acquisition Cost
            </label>
            <TextInput
              placeholder="Enter lead acquisition cost"
              value={leadCost}
              onChange={(e) => setLeadCost(e.target.value)}
              type="number"
              min="0"
              step="0.01"
              icon={() => "$"}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
              Lead User Conversion Rate
            </label>
            <TextInput
              placeholder="Enter Lead User Conversion Rate"
              value={conversionRate}
              onChange={(e) => setConversionRate(e.target.value)}
              type="number"
              min="0"
              max="100"
              step="0.1"
              icon={() => "%"}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
              Paid User Conversion Rate
            </label>
            <TextInput
              placeholder="Enter Paid User Conversion Rate"
              value={paidConversionRate}
              onChange={(e) => setPaidConversionRate(e.target.value)}
              type="number"
              min="0"
              max="100"
              step="0.1"
              icon={() => "%"}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
              Charge Per User
            </label>
            <TextInput
              placeholder="Enter Charge Per User"
              value={chargePerUser}
              onChange={(e) => setChargePerUser(e.target.value)}
              type="number"
              min="0"
              step="0.01"
              icon={() => "$"}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
              Churn Rate
            </label>
            <TextInput
              placeholder="Enter Churn Rate"
              value={churnRate}
              onChange={(e) => setChurnRate(e.target.value)}
              type="number"
              min="0"
              max="100"
              step="0.1"
              icon={() => "%"}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <BarChart
            data={chartData}
            index="date"
            categories={['amount']}
            colors={["#3B82F6"]}
            valueFormatter={valueFormatter}
            yAxisWidth={65}
            onValueChange={(v) => setSelectedValue(v?.amount as number)}
            showTooltip={true}
            showLegend={false}
            style={{ 
              '--tw-ring-color': 'rgb(59, 130, 246)',
              fill: 'rgb(59, 130, 246)'
            } as React.CSSProperties}
            className="mt-6 hidden h-96 sm:block [&_rect]:fill-blue-500 [&_text]:fill-foreground [&_text]:text-foreground dark:[&_text]:fill-foreground dark:[&_text]:text-foreground [&_rect:hover]:fill-blue-600"
            customTooltip={(props) => (
              <div className="p-2 bg-white dark:bg-gray-800 shadow-lg shadow-gray-400/50 dark:shadow-gray-900/50 rounded">
                {valueFormatter(props?.payload?.[0]?.value as number, false)}
              </div>
            )}
          />
        </div>
        <BarChart
          data={chartData}
          index="date"
          categories={['amount']}
          colors={["#3B82F6"]}
          valueFormatter={valueFormatter}
          showTooltip={true}
          showLegend={false}
          onValueChange={(v) => setSelectedValue(v?.amount as number)}
          showYAxis={false}
          className="mt-4 h-72 sm:hidden bg-white dark:bg-gray-800 [&_text]:fill-black [&_text]:text-black dark:[&_text]:fill-black dark:[&_text]:text-black [&_rect:hover]:fill-blue-600 rounded-lg"
          customTooltip={(props) => (
            <div className="p-2 bg-white dark:bg-gray-800 shadow-lg shadow-gray-400/50 dark:shadow-gray-900/50 rounded">
              {valueFormatter(props?.payload?.[0]?.value as number, false)}
            </div>
          )}
        />
      </Card>
    </>
  );
}