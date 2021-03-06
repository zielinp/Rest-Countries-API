import React, { useEffect, useState } from "react"

import styled from "styled-components"
import { Link } from "gatsby"

const DetailCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 2rem;
  margin: 2rem;
`

const FlagBox = styled.img`
  width: 100%;
  justify-items: center;
  @media only screen and (max-width: 768px) {
    width: 80%;
    display: flex;
    /* justify-self: center; */
  }
`
const TextContainer = styled.div`
  display: grid;
  grid-template-rows: 0.5fr auto 1fr;
`
const Title = styled.p`
  margin: 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.25rem;
`
const BorderCountriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-right: 1rem;
  align-content: flex-start;
  p {
    font-size: 1rem;
    margin: 0;
    line-height: 1.5rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }

  button {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    height: 1.5rem;
    min-width: 5rem;
    box-shadow: 0 0 10px 0 var(--boxShadowColor);
    background-color: white;
    border: none;
    border-radius: 5px;
    text-align: center;
    :hover {
      cursor: pointer;
      transform: scale(0.9);
    }
  }
`

const InfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`
const TextBox = styled.div`
  margin: 0;
  width: 14rem;
  p {
    font-size: 1rem;
    margin: 0;
    line-height: 1.5rem;
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }
`

// function getBorderFullName(alpha3Code) {
//   let fullBorderName = " "
//   fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}?fields=name`)
//     .then(res => res.json())
//     .then(res => {
//       //console.log(res)
//       fullBorderName = res.name
//       console.log(fullBorderName)
//     })

//   return fullBorderName
// }

function DetailCard({
  countryName,
  alpha3Code,
  nativeName,
  population,
  region,
  subregion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  borders,
}) {
  // const [key, setKey] = useState(undefined)

  // useEffect(() => {
  //   setKey(localStorage.getItem("countries"))
  // }, [])

  const [result, setResult] = useState("")
  // const [border2, setBorder2] = useState("")
  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(res => res.json())
      .then(res => {
        setResult(res[0])
        // console.log(res[0].name)
      })
  }, [countryName])

  return (
    <>
      <DetailCardContainer>
        <FlagBox src={`https://restcountries.eu/data/${alpha3Code}.svg`} />
        <TextContainer>
          <Title>{countryName}</Title>
          <InfoBox>
            <TextBox>
              <p>
                Native Name: <span>{nativeName}</span>
              </p>
              <p>
                Population:{" "}
                <span>
                  {population
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </span>
              </p>
              <p>
                Region: <span>{region}</span>
              </p>
              <p>
                Sub Region: <span>{subregion}</span>
              </p>
              <p>
                Capital: <span>{capital}</span>
              </p>
            </TextBox>
            <TextBox>
              <p>
                Top Level Domain: <span>{topLevelDomain}</span>
              </p>
              <p>
                Currencies:
                {currencies === null
                  ? "No curriences"
                  : currencies.map(currency => <span> {currency.name}</span>)}
              </p>
              <p>
                Languages:
                {languages === null
                  ? "No languages"
                  : languages.map(language => <span> {language.name}</span>)}
              </p>
            </TextBox>
          </InfoBox>
          <BorderCountriesContainer>
            <p> Border Countries: </p>
            {borders === null || borders.length === 0
              ? "No border countries"
              : borders.map(border => (
                  <Link to={`/detail/${border.toLowerCase()}`}>
                    <button>{border}</button>
                  </Link>
                ))}
          </BorderCountriesContainer>
        </TextContainer>
      </DetailCardContainer>
    </>
  )
}

export default DetailCard
