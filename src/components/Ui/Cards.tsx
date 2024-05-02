import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import BoltIcon from '@mui/icons-material/Bolt';
import { Box, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';


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
const ITEMS_PER_PAGE = 15;

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


  function apiCall() {
    setLoading(true);
    var data = {
      "limit": ITEMS_PER_PAGE * page,
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
        setData(response.data.jdList);
        setPage(prevPage => prevPage + 1);
        setTotalItems(newItems.length);
      }
    }).catch(error => {
      console.log("Error In Post Data", error);
    });
  }



  useEffect(() => {
    apiCall(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && data.length < totalItems) {
        apiCall(page); // Call with the current data length as offset
      }
    }, {
      threshold: 1,
    });

    observer.observe(document.querySelector('.sentinel') as HTMLInputElement)!;

    return () => {
      observer.disconnect();
    };
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

                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom component={'span'}>
                  Estimated salary:{value.maxJdSalary}
                </Typography>
                <Typography variant="body1" component={'span'}>
                  {displayedContent}
                  {contentLines.length > MAX_LINES && (
                    <span onClick={() => { toggle(value.jdUid) }} style={{ cursor: 'pointer', color: 'blue' }}>
                      {expandedId === value.jdUid ? null : '... '}
                      <Box textAlign='center'>{expandedId === value.jdUid ? "View Less" : "View More"}</Box>
                    </span>
                  )}
                </Typography>
                <Typography sx={{ fontSize: 14 }} component={'span'} className='mt-6'>
                  Minimum Experience
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.minExp} years
                </Typography>
                <Box textAlign='center' my={1} >
                  <Button variant='contained' style={{ backgroundColor: "#55efc4", color: 'black' }}>
                    <BoltIcon className='text-[#ff822d]' /> Easy Apply
                  </Button>
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
      {loading && <div>Loading...</div>}
    </div>
  );
}
