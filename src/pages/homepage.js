import React, { useEffect, useState } from 'react'
import { Cancel, KeyboardArrowDown, Power, RemoveRedEye, Search, SyncAltRounded, Timer, Wallet } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Nav from '../component/nav';
import TimerCount from '../component/timer';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';



export default function HomePage() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [hideBalance, setHideBalance] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [pub_address, setPubAddress] = useState('');

    const [fromToken, setFromToken] = useState(null);
    const [toToken, setToToken] = useState(null);
    const [amount, setAmount] = useState(0);


    useEffect(() => {
        if (publicKey == null) {
            setPubAddress('')
            setWalletBalance(0);
        } else {
            setPubAddress(publicKey.toBase58())

            async function getAccountBalance() {
                try {
                    const balance = await connection.getBalance(publicKey);
                    setWalletBalance(balance / 1000000000);
                } catch (error) {
                    console.error('Error fetching account balance:', error);
                }
            }

            getAccountBalance();
        }

    }, [publicKey])


    return (

        <>
            <div className='text-white mainPagebg' >

                <Nav />
                <div className='py-lg-5 px-3 text-center'>
                    <h2 className='display-5 text-center'><span className='fw-bold' style={{ color: '#f7f7f8' }}>Bark</span><span style={{ fontStyle: 'italic', fontWeight: 400, }}>Swap</span></h2>
                    <p className='col-lg-5 m-auto'>
                      Unlock a new era of decentralized transactions with BarkSwap – the decentralized exchange for crypto enthusiasts.
                    </p>

                    <div className='row justify-content-center py-3 col-lg-8 m-auto align-items-center mt-3 '>

                        <div className='col-lg-5'><img className='img-fluid' src="/purchase.png" alt='presale countdown' /></div>
                        <TimerCount />
                    </div>

                    <div className='d-flex flex-wrap py-md-5 pb-md-4 justify-content-center align-items-stretch mt-3 m-auto'>
                        <div style={{
                            background: '#41424b',
                            border: '1px solid #515151',
                        }} className='rounded-5 col-lg-4 col-12 me-lg-4 mb-3 mb-lg-0  text-start p-4' >
                            <div className='mb-3'><p className='d-flex align-items-center'>Wallet Balance <span className='ms-2'><RemoveRedEye onClick={() => { setHideBalance(!hideBalance) }} /></span></p></div>
                            <div className='mb-3'><h5 className='display-6'>${hideBalance ? '*******' : Number(walletBalance * 175).toLocaleString()}</h5></div>
                            <div className='mb-3'><span className='rounded-5 py-1 ps-2 border border-1'>+4.598 <span className='rounded-5 p-1 border'>+12 %</span></span></div>

                            <div className='mb-3'>
                                <span style={{ visibility: 'hidden', position: 'absolute' }}>
                                    <WalletMultiButton
                                        sx={{ width: '100%', visbility: 'hidden' }}
                                        className='rounded-5 multibuttton shadow w-100 text-white'
                                    />
                                </span>
                                {!publicKey ?
                                    <>
                                        <button onClick={() => {
                                            let button = document.getElementsByClassName('wallet-adapter-button-trigger')[0].click();
                                            /*setShowConnect(true)*/
                                        }} className='rounded-5  inputMain shadow w-100 text-white'> <Power /> Connect Wallet</button>
                                    </>

                                    :
                                    <>
                                        <button onClick={() => {
                                            let button = document.getElementsByClassName('wallet-adapter-button-trigger')[0].click();
                                        }} className='rounded-5  inputMain shadow w-100 text-white'><Cancel /> Connected(click to disconnect)
                                            <br />
                                            <span>{`${pub_address.slice(0, 10)}..${pub_address.slice(-3, pub_address.length)}`}</span>
                                        </button>

                                    </>

                                }
                            </div>
                            <p>Connect your wallet to start swapping on BarkSwap, collect with 2% Fees for Charity Aid.</p>
                        </div>

                        <div style={{
                            background: '#41424b',
                            border: '1px solid #515151',
                        }} className='rounded-5 col-lg-6 text-start p-4' >
                            <div className='mb-3'><p className='fw-bold'>SWAP TOKENS</p></div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <p className='d-flex align-items-center'>Pay with  <Avatar sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='/solana.png' alt="Profile Picture" /> <KeyboardArrowDown /> </p>
                                </div>
                                <div className='d-flex justify-content-start'>
                                    <p className='d-flex align-items-center justify-content-start'>You get  <Avatar sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='/bitcoin.png' alt="Profile Picture" /> <KeyboardArrowDown /> </p>
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-around flex-wrap flex-lg-nowrap'>
                                <div className='mb-3 col-12 col-lg-5'><input onChange={(e) => { setAmount(e.target.value) }} className='inputStyle rounded-5 ' type='text' placeholder='Enter amount' /></div>
                                <div className='col-12 col-lg-2 text-center'>
                                    <SyncAltRounded className='mb-3 text-center' sx={{ fontSize: '3em', background: '#4c4d58', borderRadius: '12%', marginLeft: 5, marginRight: 5, padding: '5px', }} />
                                </div>
                                <div className='mb-3 col-12 col-lg-5'><input className='inputStyle rounded-5 ' type='text' placeholder='0.0000' /></div>

                            </div>

                            <div className='mb-3 align-items-center'> <Wallet /> <span>Balance:</span> <span className='btn btn-sm rounded-5 text-dark' style={{ background: '#f7f7f8' }}>{walletBalance} SOL</span> </div>

                            <hr />
                            <div className='d-flex flex-wrap flex-lg-nowrap align-items-center'>
                                <div className="col-lg-6 col-12 me-lg-2 mb-3">
                                    <input type='text' className='w-100 rounded-5 inputStyleBg' placeholder='Enter/paste Solana address' />
                                </div>
                                <div className='col-lg-6 col-12  mb-3'>
                                    <button onClick={() => { }} className='rounded-5 w-100 btn text-white inputMain shadow btn-lg'><SyncAltRounded sx={{ fontSize: '30px', background: '#4c4d58', borderRadius: '50%', padding: '5px', }} /> Approve token swap</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </>

    )
}
