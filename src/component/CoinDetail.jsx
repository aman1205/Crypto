import { Container,Box, RadioGroup, HStack, Radio, VStack,Text,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button} from '@chakra-ui/react'
import { useState ,useEffect} from 'react'
import axios from 'axios';
import React from 'react'
import Loader from './Loader';
import { server } from "../index";
import { useParams } from 'react-router-dom';
import ErrorPage from "./ErrorPage"
import  Chart  from './Chart';

const CoinDetail = () => {  
  const[coin,setCoin]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(false);
  const[currency,setCurrency]=useState('inr');
  const[days,setDays]=useState("24h");
  const[chartArray,setChartArray]=useState([]);

  const currencySymbol=
  currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const params =useParams();

  const btns=["24h" ,"7d", "14d","30d","60d","200d","365d","max"];
  const switchChartValue=(val)=>{
    switch(val){
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
       
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
       
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
       
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
       
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
       
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "365d":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
       
      default:
        setDays("24h");
        setLoading(true);
        break;

    }
  }

  useEffect(()=>{
    const FetchCoin= async ()=>{
    try {
      const { data } = await axios.get(`${server}/coins/${params.id}`);
      const {data:chartData} = await axios.get(
        `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      
      // console.log(chartData);
      setCoin(data);
      setChartArray(chartData.prices);
      setLoading(false)
    } catch (error) {
      setError(true);
      setLoading(false);
    }
      
    }
    FetchCoin();
  },[params.id,currency,days]);

  if(error) return <ErrorPage message={"Error while fetchinf Api"}/>
  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader/> :(
          <>
            <Box w={"full"} borderWidth={1}>
              <Chart arr={chartArray} currency={currencySymbol}  days={days}/>

            </Box>

            <HStack padding={'4'} wrap={'wrap'}>
              {btns.map((i)=>(
                <Button key={i}  onClick={()=>switchChartValue(i)}   >{i}</Button>
              ))
              }
            </HStack>

            <RadioGroup value={currency}  onChange={setCurrency} p={"8"}>
              <HStack spacing={'4'}>
                <Radio value={"inr"}>₹</Radio>
                <Radio value={"usd"}>$</Radio>
                <Radio value={"eur"}>€</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p={'16'} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
                  Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Image src={coin.image.large} h={'16'} w={'16'} objectFit={"contain"}/>
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase": 'decrease'}/>
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge fontSize={"2x1"} bgColor={"blackAlpha.800"} color={'white'}>{ `#${coin.market_cap_rank}`}</Badge>

              <CustoBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>

              <Box w={"full"} p="4" >
                <Item  title={"Max Supply"} value={coin.market_data.max_supply} />
                <Item  title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
                <Item  title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item  title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
                <Item  title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />

              </Box>

            </VStack>
          </>
        )
      }

    </Container>
  )
}
const Item =({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
     <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}</Text>
     <Text>{value}</Text>
  </HStack>
)

const CustoBar=({high,low})=>(
  <VStack>
    <Progress value={50} colorScheme={"teal"}  w={"full"}  />  
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"}/>
       <Text fontSize={"sm"}>24h Range</Text>
      <Badge children={high} colorScheme={"green"}/>

    </HStack>
  </VStack>
)

export default CoinDetail

