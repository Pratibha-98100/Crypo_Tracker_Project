import axios from "axios";
import { useEffect, useState } from "react";
import TopButton from "../components/Common/BackToTop/topButton";
import Footer from "../components/Common/Footer/footer";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader/loader";
import PaginationComponent from "../components/Dashboard/Pagination/pagination";
import SearchComponent from "../components/Dashboard/Search/search";
import TabsComponent from "../components/Dashboard/Tabs/tabs";
import { get100Coins } from "../functions/get100Coins";


// here searching is filter 
// passing pageNumber , handlePagechange  to : PaginationComponent
function DashboardPage() {

  //---------for loading---------
  const [loading, setLoading] = useState(false);
  
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  //------ PaginationComponents { 1, 2, 3 ...... }---------- 
  const [pageNumber, setPageNumber] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);


  // function : for updating the current page number when a user selected number
  // value : new page number
  const handlePageChange = (event, value) => {
    setPageNumber(value);
    var startingIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(startingIndex, startingIndex + 10));
  };


  const onChange = (e) => {
    setSearch(e.target.value);
  };

  //-----------For searching name { returing array } and using in <TabsComponent/> ---------------------
  var filteredCoins = coins.filter((coin) => {
    if( coin.name.toLowerCase().includes(search.toLowerCase())     
               ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      ){
      return coin;
    }
  });



  // -------getting/ fetching data from getData function
  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    setLoading(true);
    const data = await get100Coins();
    if (data) {
      setCoins(data);
      setPaginatedCoins(data.slice(0, 10));
      setLoading(false);
    }
  };

  return (
    <>
      <TopButton />
      {
        loading 
            ? 
        <Loader/>
            : 
        <div style={{ minHeight: "90vh" }}>

          <Header />
          <SearchComponent search={search} onChange={onChange} />
          <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
            setSearch={setSearch}
          />

          {
            !search 
               && 
            <PaginationComponent
              pageNumber={pageNumber}
              handleChange={handlePageChange}
            />
          }
          
        </div>
       }

      <Footer />
    </>
  );
}

export default DashboardPage;


//how use pagination
// first i used useeffect to set the values of pageNumber and