import React from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenedorHeader = styled.header`
    color: white;
    background-color: #2D333B;
    padding: 10px;
    font-weight; bold;
`;
const TextoHeader= styled.h1`
    font-size: 2rem;
    margin: 0;
    font-family: 'Slapo 27px', serif;
    text-align: center;
`;

const Header = ({titulo}) => {
    return ( 

        <ContenedorHeader>
            <TextoHeader>{titulo}</TextoHeader>

        </ContenedorHeader>
     );
}
Header.propTypes = {
    titulo: PropTypes.string.isRequired
}
     
export default Header;