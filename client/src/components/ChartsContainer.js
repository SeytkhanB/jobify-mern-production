
import {useState} from 'react';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

export default function ChartsContainer() {
  const [barChart, setBarChart] = useState(true)
  const {monthlyApplications: data} = useAppContext()

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}