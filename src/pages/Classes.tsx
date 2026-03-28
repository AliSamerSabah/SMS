import useAppContext from '@/hooks/useAppContext';
import { Link, useParams } from 'react-router-dom';

export default function Classes() {
  const { classNum } = useParams();
  if (classNum === undefined) return '';
  const  CPG:any  = useAppContext().school.CPG;
  const className = CPG[classNum];
  const arr = [];
  for (let index = 0; index < className; index++) {
    arr.push('');
  }
  const stages = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <div className="flex justify-center pt-30 min-h-screen flex-wrap">
      <div className="w-200 flex justify-center items-center flex-wrap h-50 gap-5">
        {arr.map((_, i) => (
          <Link to={`/grades/${classNum}/${stages[i]}`} key={i}>
            <div className="box-effect size-50 rounded-4xl flex items-center justify-center font-extrabold text-3xl hover:scale-110 transition-all duration-500 dark:hover:brightness-125  hover:brightness-75">
              Class {stages[i]}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
