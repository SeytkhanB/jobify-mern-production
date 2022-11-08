
import Wrapper from '../assets/wrappers/StatItem';

export default function StatItem({title, count, bcg, icon, color}) {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <div className='icon'>{icon}</div>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}