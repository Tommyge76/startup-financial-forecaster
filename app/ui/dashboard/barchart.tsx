'use client';

import { useState } from 'react';
import { BarChart, Card, Divider, Switch } from '@tremor/react';

const data = [
  {
    date: 'Jan 23',
    'This Year': 68560,
    'Last Year': 28560,
  },
  {
    date: 'Feb 23',
    'This Year': 70320,
    'Last Year': 30320,
  },
  {
    date: 'Mar 23',
    'This Year': 80233,
    'Last Year': 70233,
  },
  {
    date: 'Apr 23',
    'This Year': 55123,
    'Last Year': 45123,
  },
  {
    date: 'May 23',
    'This Year': 56000,
    'Last Year': 80600,
  },
  {
    date: 'Jun 23',
    'This Year': 100000,
    'Last Year': 85390,
  },
  {
    date: 'Jul 23',
    'This Year': 85390,
    'Last Year': 45340,
  },
  {
    date: 'Aug 23',
    'This Year': 80100,
    'Last Year': 70120,
  },
  {
    date: 'Sep 23',
    'This Year': 75090,
    'Last Year': 69450,
  },
  {
    date: 'Oct 23',
    'This Year': 71080,
    'Last Year': 63345,
  },
  {
    date: 'Nov 23',
    'This Year': 61210,
    'Last Year': 100330,
  },
  {
    date: 'Dec 23',
    'This Year': 60143,
    'Last Year': 45321,
  },
];

function valueFormatter(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(number);
}

export default function SalesBarChart() {
  const [showComparison, setShowComparison] = useState(false);
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-7xl">
        <h3 className="ml-1 mr-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Sales overview
        </h3>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Some Chart For Some Random Startup
        </p>
        <div className="bg-gray-900 p-4">
          <BarChart
            data={data}
            index="date"
            categories={
              showComparison ? ['Last Year', 'This Year'] : ['This Year']
            }
            colors={["#3B82F6", "#6366F1"]}
            valueFormatter={valueFormatter}
            yAxisWidth={65}
            style={{ 
              '--tw-ring-color': 'rgb(59, 130, 246)',
              fill: 'rgb(59, 130, 246)'
            } as React.CSSProperties}
            className="mt-6 hidden h-96 sm:block [&_rect]:fill-blue-500"
          />
        </div>
        <BarChart
          data={data}
          index="date"
          categories={
            showComparison ? ['Last Year', 'This Year'] : ['This Year']
          }
          colors={["#3B82F6", "#6366F1"]}
          valueFormatter={valueFormatter}
          showYAxis={false}
          className="mt-4 h-72 sm:hidden text-white bg-gray-900"
        />
        <Divider />
        <div className="mb-2 flex items-center space-x-3">
          <Switch
            id="comparison"
            onChange={() => setShowComparison(!showComparison)}
          />
          <label
            htmlFor="comparison"
            className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
          >
            Show same period last year
          </label>
        </div>
      </Card>
    </>
  );
}