import  { useEffect, useState } from 'react';
import CreatorCard from './CreatorCard';
import {MdChevronLeft} from 'react-icons/md';
import {MdChevronRight} from 'react-icons/md';


const query = `
query GetAccounts($request: AccountsRequest!) {
  accounts(request: $request) {
    items {
      username {
        value
      }
      score
      createdAt
      metadata {
        name
        bio
        picture     # No subfields — picture is just a URI string
        coverPicture
      }
    }
  }
}
`;

const variables = {
  request: {
    pageSize: "TEN",
    orderBy: "ACCOUNT_SCORE"
  }
};


export default function TopCreators() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch('https://api.lens.xyz/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })
      .then(res => res.json())
      .then(json => {
        const items = json.data.accounts.items;
        console.log(items);
        setAccounts(items);
      });
  }, []);

  const sideLeft = () => {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 700;
  }

  const sideRight = () => {
    let slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 700;
  }

  return (
  <div className='p-4 pb-8 mt-10 bg-[#141414] mx-40 rounded-2xl'>
    <div className='flex items-center justify-between '>
      <h2 className='text-2xl ml-4 font-semibold text-gray-200'>Top Creators</h2>
      <div className='flex'>
        <div className='bg-[#272727] m-1 rounded-md hover:bg-gray-800'>
        <MdChevronLeft onClick={sideLeft}  size={30} className="text-gray-200 cursor-pointer  h-full" />
        </div>
      <div className='bg-[#272727] m-1 rounded-md hover:bg-gray-800'>
      <MdChevronRight onClick={sideRight} size={30} className="text-gray-200 cursor-pointer h-full"  />
      </div>
    
      </div>
     
    </div>

<div className='relative flex '>
      <div id='slider' className='flex w-full py-2 h-full overflow-x-scroll scroll scroll-smooth scrollbar-hidden'>
      {accounts.map((account,i) => (
          <div key={i} className='h-[250px] '>
          <CreatorCard creator={account} />
        </div>
      ))
      }
      </div>
      
    </div>
  </div>
    
    
  );
}
