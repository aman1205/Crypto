import { Container, HStack, VStack,Image, Heading,Text ,Button, RadioGroup, Radio} from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from "../index";
import Loader from "./Loader"
import ErrorPage from './ErrorPage';
import {Link} from "react-router-dom"
const Coin = () => {
  const[coin,setCoin]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(false);
  const[page,setPage]=useState(1);
  const[currency,setCurrency]=useState('inr')
  const currencySymbol=
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage=(page)=>{
        setPage(page);
        setLoading(true);
  };
  const  btnp=new Array(132).fill(1);
  
  useEffect(()=>{
    const fetchCoin= async ()=>{
    try {
      const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setCoin(data);
      setLoading(false)
    } catch (error) {
      setError(true);
      setLoading(false);
    }
      
    }
    fetchCoin();
  },[currency,page]);

  if(error) return <ErrorPage message={"Error while Fetching Api"} />


  return (
    <Container maxW={'container.xl'}>{loading?
       <Loader/>: 
       <>
       <RadioGroup value={currency}  onChange={setCurrency} p={"8"}>
        <HStack spacing={'4'}>
            <Radio value={"inr"}>₹</Radio>
            <Radio value={"usd"}>$</Radio>
            <Radio value={"eur"}>€</Radio>
        </HStack>
       </RadioGroup>
       <HStack  wrap={'wrap'} justifyContent={"space-evenly"}>
         {coin.map((item)=>(
          <CoinCard 
          id={item.id}
          key={item.id}
          name={item.name}
          price={item.current_price}
          image={item.image}
          symbol={item.symbol}
          currencySymbol={currencySymbol}
          />
         ))}
       </HStack>

       <HStack w={'full'} overflowX={"auto"} p={'8'}>
       {
        btnp.map((item,index)=>(
            <Button 
            bgColor={"blackAlpha.900"}
            color={"white"}
            key={index}
            onClick={()=>changePage(index +1)}>
                {index+1}</Button>
        ))
       }
       </HStack>
       </> 
       }
    </Container>
  );
};






const CoinCard=({id,name,symbol,image,price ,currencySymbol="₹"})=>(
  <Link to={`/coin/${id}`} >
    <VStack w={"52"} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={"all 0.3s"} m={'4'}
    css={{
      "&:hover":{
        transform:"scale(1.1)",
      },
    }}
    >
      <Image src={image} w={"10"} h={"10"} objectFit={"contain"} alt={name}/>
      <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
      <Text>
        {price?`${currencySymbol}${price}`:"NA"}
      </Text>
    </VStack>
     

  </Link>
);





export default Coin
