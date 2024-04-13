import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import Nav from '../component/nav';
import TimerCount from '../component/timer';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export default function HomePage() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [walletBalance, setWalletBalance] = useState(0);
    const [pubAddress, setPubAddress] = useState('');

    useEffect(() => {
        if (publicKey === null) {
            setPubAddress('');
            setWalletBalance(0);
        } else {
            setPubAddress(publicKey.toBase58());

            const getAccountBalance = async () => {
                try {
                    const balance = await connection.getBalance(publicKey);
                    setWalletBalance(balance / 1000000000);
                } catch (error) {
                    console.error('Error fetching account balance:', error);
                    // Handle error gracefully
                }
            };

            getAccountBalance();
        }
    }, [connection, publicKey]);

    return (
        <>
            <div className='text-white mainPagebg'>
                <Nav />
                <div className='py-lg-5 px-3 text-center'>
                    <h2 className='display-5 text-center'>
                        <span className='fw-bold' style={{ color: '#f7f7f8' }}>Bark</span>
                        <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Swap</span>
                    </h2>
                    <p className='col-lg-5 m-auto'>
                        Unlock a new era of decentralized transactions with BarkSwap – the decentralized exchange for crypto enthusiasts.
                    </p>
                    <div className='row justify-content-center py-3 col-lg-8 m-auto align-items-center mt-3 '>
                        <div className='col-lg-5'><img className='img-fluid' src="/purchase.png" alt='presale countdown' /></div>
                        <TimerCount />
                    </div>
                    <div className='d-flex flex-wrap py-md-5 pb-md-4 justify-content-center align-items-stretch mt-3 m-auto'>
                        <div className='col-md-6 mb-3'>
                            <div className='bg-light p-3 rounded-3'>
                                <h4 className='mb-3'>Wallet Information</h4>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>Public Address:</span>
                                    <span>{pubAddress}</span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-2'>
                                    <span>Wallet Balance:</span>
                                    <span>{walletBalance} SOL</span>
                                </div>
                            </div>
                        </div>
                        {/* Add more wallet-related information or actions here */}
                    </div>
                </div>
            </div>
        </>
    );
}
