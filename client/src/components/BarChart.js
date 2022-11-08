
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function BarChartComponent({data}) {
  return (
    <ResponsiveContainer
      width='100%' height={300}
    >
      <BarChart
        data={data}
        margin={{top: 50}}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='data' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#FFB553' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  )
}