import { Container, HStack, VStack,Image, Heading,Text } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from "../index";
import Loader from "./Loader"
import ErrorPage from './ErrorPage';
const Exchange = () => {
  const[exchange,setExchange]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(false);
  useEffect(()=>{
    const api= async ()=>{
    try {
      const { data } = await axios.get(`${server}/exchanges`);
      setExchange(data);
      setLoading(false)
    } catch (error) {
      setError(true);
      setLoading(false);
    }
      
    }
    api();
  },[]);
  if(error) return <ErrorPage message={"You make an error when calling Api"} />
  return (
    <Container maxW={'container.xl'}>{loading?
       <Loader/>: 
       <>
       <HStack  wrap={'wrap'} justifyContent={"space-evenly"}>
         {exchange.map((item)=>(
          <ExchangeCard 
          key={item.id}
          name={item.name}
          rank={item.trust_score_rank}
          image={item.image}
          url={item.url}
          />
         ))}
       </HStack>
       </> 
       }
    </Container>
  );
};
const ExchangeCard=({name,rank,image,url})=>(
  <a href={url} target={'blank'}>
    <VStack w={"52"} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={"all 0.3s"} m={'4'}
    css={{
      "&:hover":{
        transform:"scale(1.1)",
      },
    }}
    >
      <Image src={image} w={"10"} h={"10"} objectFit={"contain"} alt={name}/>
      <Heading size={"md"} noOfLines={1}>{rank}</Heading>
      <Text>
        {name}
      </Text>
    </VStack>
     

  </a>
)
export default Exchange
