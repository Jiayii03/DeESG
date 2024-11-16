import CompanyTable from './CompanyTable';

const Explore = () => {
  return (
    <main>
        <div className="flex">
          <div className="basis-3/12"></div>
          
          <div className="basis-6/12">
            <CompanyTable />
          </div>
          
          <div className="basis-3/12"></div>
        </div>
    </main>
  );
}   

export default Explore;