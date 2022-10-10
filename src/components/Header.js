import React from 'react';
import styled from 'styled-components';
// import './header.css';

const Head = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center; 
background-color: red;


`;
const Heading = styled.h1`
color : white;
font-weight : 500;
font-size: 32px;
height:50px;
`;
export default function Header() {
  return (
    <Head>
      <Heading>
        Bip Movies
      </Heading>
    </Head>
  )
}
