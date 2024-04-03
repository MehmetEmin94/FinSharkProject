import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { CompanyProfile } from '../../company';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';
import { getCompanyProfile } from '../../api';

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();

  const [company,setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    console.log(ticker);
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);

  return (
    <>
    {company?(
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">

      <Sidebar/>

      <CompanyDashboard ticker={ticker!}>
        <Tile title="Company Name" subtitle={company.companyName}/>
        <Tile title="Price" subtitle={company.price.toString()}/>
        <Tile title="Sector" subtitle={company.sector}/>
        <Tile title="DCF" subtitle={parseFloat(company.dcf.toFixed(2)).toString()}/>
        <p className='bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4'>
          {company.description}
        </p>
      </CompanyDashboard>
    </div>
    ) : (
      <div>Company not found!</div>
    )
    }
    </>
  )
}

export default CompanyPage