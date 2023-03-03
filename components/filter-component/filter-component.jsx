import React from 'react'
import { Container } from './style'
import Image from 'next/image'
import Link from 'next/link'

const Footer = ({type, category, setCategory, followers, setFollowers, location, setLocation, age, setAge, engagement, setEngagement}) => {
  const clearFilter = () => {
    setCategory("");
    setFollowers("");
    setLocation("");
    setAge("");
    setEngagement("");
  }
  return (
    <Container>
        <TopWrap>
            <Wrap>

            </Wrap>
            <Wrap>
                
            </Wrap>
            <Wrap>
                
            </Wrap>
        </TopWrap>
        <BottomWrap>
            <button>Clear filter</button>  
        </BottomWrap>
    </Container>
  )
}

export default Footer