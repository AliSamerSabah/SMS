import { Link } from 'react-router-dom';
export default function NFP() {
  return (
    <div className="flex justify-center min-h-screen mt-20  ">
      <div className="box-effect w-100 h-80 flex  items-center flex-col ">
        <h1>404 ERROR</h1>
        <h2 className="mb-30">PAGE NOT FOUND</h2>
        <p className="opacity-80">please go to another page such as <Link to={'/'} className="text-blue-600 underline">Home page</Link> </p>
      </div>
    </div>
  );
}
