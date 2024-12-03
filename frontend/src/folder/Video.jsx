import axios from 'axios';
import fs from 'fs'; // Node.js module to write to a file

const fetchData = async () => {
  const url = 'https://lmt.fn.sportradar.com/common/en/Etc:UTC/cricket/get_scorecard/55046225?T=exp=1733192050~acl=/*~data=eyJvIjoiaHR0cHM6Ly9zY29yZWNhcmQub2Rkc3RyYWQuY29tIiwiYSI6IjhlZTQ1YjU3NGUyNzgxZDU4MWIwYjBhMTMzODAzOTA2IiwiYWN0Ijoib3JpZ2luY2hlY2siLCJvc3JjIjoib3JpZ2luIn0~hmac=40f8084c9bfb044ec064915b04f57ee82fafbddf0ae4105096a8b1d92d9edda3';

  try {
    // Make the GET request with the necessary headers
    const response = await axios.get(url, {
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Origin': 'https://scorecard.oddstrad.com',
        'Referer': 'https://scorecard.oddstrad.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'If-Modified-Since': 'Mon, 02 Dec 2024 00:20:48 GMT',
        'If-None-Match': 'cb986a3ea792582004962c27487c37fc416fcb20',
        'Te': 'trailers',
      },
    });

    // Store the response data in a JSON file
    const jsonData = response.data;
    fs.writeFileSync('scorecard.json', JSON.stringify(jsonData, null, 2));

    console.log('Data successfully saved to scorecard.json');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the fetchData function
fetchData();
// Video.jsx
const Video = () => {
    return (
      <div>
        <h1>Video Component</h1>
      </div>
    );
  };
  
  export default Video;  // Ensure there's a default export
  
