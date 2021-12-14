import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { 
    Container, 
    createTheme, 
    LinearProgress, 
    makeStyles, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    ThemeProvider, 
    Typography 
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const CoinsTable = () => {
    const [coins,setCoins] = useState([]);
    const [loading,setloading] = useState(false);
    const [search, setSearch] = useState()
    const history = useHistory();

    const {currency} = CryptoState();

    const fetchCoins = async () =>{
        setloading(true);
        const{data} = await axios.get(CoinList(currency));
        setCoins(data);
        setloading(false);
    };

    console.log(coins);

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette:{
            primary:{
                main: "#fff"
            },
            type: "dark"
        }
    });
    const handleSearch = () => {
        return coins.filter(
            (coin) => 
                coin.name.toLowerCase().includes(search) || 
                coin.symbol.toLowerCase().includes(search)
            );
    };
    const useStyles = makeStyles(() => ({

    }))
    const classes = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
          <Container style={{textAlign: "center"}}>
            <Typography
                variant="h4"
                style={{ margin:18,fontFamily:"Montserrat"}}
            > 
                CryptoCurrency price by market cap
            </Typography> 
            <TextField 
                label = "Search for a cryptocurrency"
                variant="outlined"
                style={{marginBottom:20,width:"100%"}}
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer>
            {
                loading ? (
                    <LinearProgress style = {{backgroundColor:"gold"}}/>
                ):(
                    <Table aria-label="simple table">
                        <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                            <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <TableCell
                                style={{
                                    color: "black",
                                    fontWeight: "700",
                                    fontFamily: "Montserrat",
                                }}
                                key={head}
                                align={head === "Coin" ? "" : "right"}
                                >
                                {head}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch().map((row)=>{
                                const profit = row.price_change_percentage_24h>0;

                                return (
                                    <TableRow
                                        onClick={() => history.push(`/coins/${row.id}`)}
                                        className={classes.row}
                                        key={row.name}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            styles={{
                                                display:"flex",
                                                gap: 15
                                            }}
                                        >
                                            <img
                                            src={row?.image}
                                            alt={row.name}
                                            height="50"
                                            style={{marginBottom:10}}
                                            />
                                            <div
                                                style={{
                                                    display:"flex",
                                                    flexDirection:"column"
                                                }}
                                            >
                                            
                                            <span
                                                style= {{
                                                    textTransform: "uppercase",
                                                    fontSize:22
                                                }}
                                            >
                                                {row.symbol}
                                            </span>
                                            <span style={{color:"darkgrey"}}>{row.name}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )
            }
            </TableContainer>
          </Container>  
        </ThemeProvider>
    )
}

export default CoinsTable
