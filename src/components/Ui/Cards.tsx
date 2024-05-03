import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoltIcon from '@mui/icons-material/Bolt';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { Link } from 'react-router-dom';
import { TotalJob } from '../../Redux/FilterApi';
import RefreshIcon from '@mui/icons-material/Refresh';


interface ApiData {
  jobDetailsFromCompany: string
  jdUid: string
  jobRole: string
  maxJdSalary: string | null
  minExp: string | null
  location: string
  jdLink: string
  salaryCurrencyCode: string
}

const MAX_LINES = 1;
const ITEMS_PER_PAGE = 10;

export default function Cards() {
  const [expandedId, setExpandedId] = useState<string | null>();
  const [data, setData] = useState<ApiData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const titleFilter = useSelector((state: RootState) => state.filterApi.titleFilter);
  const locationFilter = useSelector((state: RootState) => state.filterApi.locationFilter);
  const locationExperience = useSelector((state: RootState) => state.filterApi.locationExperience);
  const JobWork = useSelector((state: RootState) => state.filterApi.jobWork);
  const CName = useSelector((state: RootState) => state.filterApi.Cname);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();


  function apiCall(ofset: number) {
    setLoading(true);
    var data = {
      "limit": ITEMS_PER_PAGE * ofset,
      "ofset": ofset
    }
    axios({
      method: 'post',
      url: `https://api.weekday.technology/adhoc/getSampleJdJSON`,
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-control-allow-origin': '*'
      },
    }).then(response => {
      setLoading(false);
      const newItems = response.data.jdList;
      if (newItems.length > 0) {
        setData(prevData => {
          const newData = [...prevData];
          newItems.forEach((item:any) => {
            if (!newData.find(existingItem => existingItem.jdUid === item.jdUid)) {
              newData.push(item);
            }
          });
          return newData;
        });
        // setData(response.data.jdList);
        setTotalItems(response.data.totalCount);
        dispatch(TotalJob(response.data.totalCount))
      }
    }).catch(error => {
      console.log("Error In Post Data", error);
    });
  }


  useEffect(() => {
    apiCall(page); // Call with the current data length as offset
  }, [page]);// Only re-run the effect if page changes



  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredData = data.filter((value) => {
    const titleMatch = value.jobRole.toLowerCase().includes(titleFilter.toLowerCase());
    const locationMatch = value.location.toLowerCase().includes(locationFilter.toLowerCase());
    const CompanyName = value.location.toLowerCase().includes(CName.toLowerCase()); // change value.location
    const experienceMatch = !locationExperience || value.minExp == locationExperience;
    const Working = value.location.toLowerCase().includes(JobWork.toLowerCase());
    return titleMatch && locationMatch && experienceMatch && Working && CompanyName;
  });

  // if (loading === true) {
  //   return (
  //     <div className='pt-4'>
  //       {loading &&
  //         <svg className="ml-auto mr-auto block animate-spin h-8 w-12 mr-3" viewBox="0 0 24 24">
  //           <circle className="opacity-25 text-orange-950" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  //           <path className="opacity-75 text-red-500" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  //         </svg>}
  //     </div>
  //   )
  // }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 py-4 gap-4'>
        {
          filteredData.map((value) => {
            const contentLines = value.jobDetailsFromCompany.split('.');
            const displayedContent = expandedId === value.jdUid ? contentLines.join('\n') : contentLines.slice(0, MAX_LINES).join('\n');
            return (
              <Card sx={{
                maxWidth: 345, ':hover': {
                  boxShadow: 20,
                },
              }} key={value.jdUid}>
                <Box display="flex"
                  justifyContent="left"
                  alignItems="center"
                  mt={2}
                  ml={2}
                >
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom className='p-1 rounded-lg border' component={'span'}>
                    Posted 10 days ago
                  </Typography>
                </Box>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  title={`Company Name`}
                  subheader={<>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom component={'div'}>
                      {value.jobRole}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom component={'div'}>
                      {value.location}
                    </Typography>
                  </>
                  }
                />
                <CardContent>

                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom component={'div'}>
                    Estimated salary:{value.maxJdSalary} {value.salaryCurrencyCode}
                  </Typography>
                  <Typography variant="body1" component={'span'}>
                    {displayedContent}
                    {contentLines.length > MAX_LINES && (
                      <span onClick={() => { toggle(value.jdUid) }} style={{ cursor: 'pointer', color: 'blue' }}>
                        {/* <span style={{ cursor: 'pointer', color: 'blue' }}> */}
                        {expandedId === value.jdUid ? null : '... '}
                        <Box textAlign='center'>{expandedId === value.jdUid ? "View Less" : "View More"}</Box>
                        {/* <Box textAlign='center'> View More</Box> */}
                      </span>
                    )}
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} component={'span'} className='mt-6'>
                    Minimum Experience:{value.minExp === null ? "1" : value.minExp} years
                  </Typography>
                  <Box textAlign='center' my={1} >
                    <Link to={value.jdLink}>
                      <Button variant='contained' style={{ backgroundColor: "#55efc4", color: 'black' }}>
                        <BoltIcon className='text-[#ff822d]' /> Easy Apply
                      </Button>
                    </Link>
                  </Box>
                  <Box textAlign='center'>
                    <Button variant='contained' style={{ backgroundColor: "#55efc4", color: 'black' }}>
                      Unlock referral asks
                    </Button>
                  </Box>
                </CardContent>
              </Card>

            )
          })
        }
      </div>
      <div className="sentinel" style={{ height: '20px' }}></div>
      <div className="flex justify-center space-x-4 text-lg">

        <Button variant='contained' style={{ backgroundColor: "#55efc4", color: 'black' }} onClick={() => { setPage(page + 1); }}>
          <RefreshIcon />Load More Data
        </Button>

      </div>
      {/* <div>
        {loading &&
          <svg className="ml-auto mr-auto block animate-spin h-8 w-12 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25 text-orange-950" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75 text-red-500" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>}
      </div> */}
    </>
  );
}
