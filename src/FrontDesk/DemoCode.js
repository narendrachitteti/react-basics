import { useEffect, useState } from "react"
import { Box,  useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import Chart from "./Chart";
import ChartWithCommission from "./CommissionChart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import axios from 'axios';
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userCount, setUserCount] = useState(0);
  const [ setError] = useState(null);
  const [ setIsLoaded] = useState(false);

  useEffect(() => {
    // Fetch the user count from the backend
    axios.get('http://localhost:5000/api/getuserdetails')
      .then(response => {
        setUserCount(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching user count', error);
      });
  }, []);

  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    // Make a GET request to fetch project count from the backend.
    fetch(`http://localhost:5000/api/projectCount`)
      .then(res => res.json())
      .then(
        (data) => {
          // If the request is successful, update the 'projectCount' state with the count received from the backend.
          setProjectCount(data.count);
        },
        (error) => {
          // If there is an error in the request, set the 'isLoaded' and 'error' states accordingly.
          setIsLoaded(true);
          setError(error);
        }
      );
  }, );
  

  const [ setIncome] = useState("0.00"); // Initialize with a default value

  useEffect(() => {
    // Fetch the income from the backend
    axios.get('http://localhost:5000/api/projectsMatrical/income')
      .then(response => {
        const incomeValue = parseFloat(response.data.income).toFixed(2);
        setIncome(incomeValue.toString()); // Ensure it's a string
      })
      .catch(error => {
        console.error('Error fetching income', error);
      });
  }, );

  const [totalIncome, setTotalIncome] = useState("0.00");

  useEffect(() => {
    // Make a GET request to fetch total income from the backend
    axios.get('http://localhost:5000/api/calculateIncomeAll') // Assuming your backend server is running on the same host
      .then(response => {
        setTotalIncome(response.data.income);
      })
      .catch(error => {
        console.error('Error fetching total income', error);
      });
  }, []);

  const [totalIncomefull, setTotalIncomeFull] = useState(0);

  useEffect(() => {
    // Fetch the total income for all projects from the backend
    axios.get(`http://localhost:5000/api/calculateIncomeAllFull`)
      .then(response => {
        setTotalIncomeFull(response.data.income);
      })
      .catch(error => {
        console.error('Error fetching total income', error);
      });
  }, []);


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Topbar />
        <div style={{ height: "100vh" }}>
          <div>
            <Box m="20px">
              {/* HEADER */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to dashboard" />
              </Box>

              {/* GRID & CHARTS */}
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
              >
                {/* ROW 1 */}
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* <Link to="/Profile"> */}
                    <StatBox
                      title={userCount} // Display the fetched user count here
                      subtitle="Channel Partners"
                      progress="0.75"
                      icon={
                        <PeopleOutlinedIcon
                          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                        />
                      }
                    />
                  {/* </Link> */}
                </Box>
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* <Link to="/ProjectsMatrical"> */}
                    <StatBox
                      title={projectCount} // Display the fetched project count here
                      subtitle="Projects"
                      progress="0.50"
                      icon={
                        <PointOfSaleIcon
                          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                        />
                      }
                    />
                    {/* </Link> */}
                </Box>
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* <Link to="/Orders"> */}
                     <StatBox
                    title={projectCount}
                    subtitle="Orders"
                    progress="0.30"

                    icon={
                      <PersonAddIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                      />
                    }
                  />
                  {/* </Link> */}

                </Box>
                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={totalIncome} // Display the fetched income here
                    subtitle="Income"
                    progress="0.80"
                    icon={
                      <TrafficIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                      />
                    }
                  />
                  

                </Box>

                <Box
                  gridColumn="span 3"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={totalIncomefull} // Display the fetched income here
                    subtitle="Total Income"
                    progress="0.80"
                    icon={
                      <TrafficIcon
                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                      />
                    }
                  />
                  

                </Box>

                {/* ROW 2 */}


              </Box>
            </Box>
            <div>
           < Chart/>
           </div>
           <div>
           <ChartWithCommission/>
           </div>
           </div>
        </div>
      </div></div>
  );
};

export default Dashboard;
