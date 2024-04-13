import React, { useEffect, useState } from 'react';
import { KeyboardArrowDown, SyncAltRounded, Wallet } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { TokenListProvider } from '@solana/spl-token-registry';

const Icon = ({ mint }) => {
    const [tokenMap, setTokenMap] = useState(new Map());

    useEffect(() => {
        new TokenListProvider().resolve().then(tokens => {
            const tokenList = tokens.filterByChainId(103).getList();
            setTokenMap(tokenList.reduce((map, item) => {
                map.set(item.address, item);
                return map;
            }, new Map()));
        });
    }, []);

    const token = tokenMap.get(mint);
    if (!token || !token.logoURI) return null;

    return (<img src={token.logoURI} />);
}

export default function Swap({ setAmount, walletBalance }) {
    const [tokenList, setTokenList] = useState(JSON.parse(localStorage.getItem('tokenList')) || []);

    useEffect(() => {
        new TokenListProvider().resolve().then(tokens => {
            const tokenList = tokens.filterByClusterSlug('mainnet-beta').getList();
            setTokenList(tokenList);
            localStorage.setItem('tokenList', JSON.stringify(tokenList));
        });
    }, []);

    const [showToken, setShowToken] = useState(false);

    return (
        <div style={{
            background: '#00023350',
            border: '1px solid #515151',
        }} className='rounded-5 col-lg-6 text-start p-4'>
            <div className='mb-3'><p className='fw-bold'>SWAP TOKENS</p></div>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <p className='d-flex align-items-center'>Pay with <Avatar onClick={() => setShowToken(!showToken)} sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='/solana.png' alt="Profile Picture" /> <KeyboardArrowDown onClick={() => setShowToken(!showToken)} /> </p>
                    {showToken &&
                        <div className='shadow rounded-3 bg-dark p-3' style={{ overflowY: 'scroll', position: 'absolute', height: '250px' }}>
                            {tokenList.length > 0 && tokenList.map((token, index) => (
                                <li style={{ cursor: 'pointer', listStyle: 'none' }} key={index}>{token.symbol}</li>
                            ))}
                        </div>
                    }
                </div>
                <div className='d-flex justify-content-start'>
                    <p className='d-flex align-items-center justify-content-start'>You get <Avatar onClick={() => setShowToken(!showToken)} sx={{ height: 40, width: 40, marginLeft: 2, marginRight: 2, border: '1px solid white' }} src='/bark.png' alt="Profile Picture" /> <KeyboardArrowDown onClick={() => setShowToken(!showToken)} /> </p>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-around flex-wrap flex-lg-nowrap'>
                <div className='mb-3 col-12 col-lg-5'><input onChange={(e) => setAmount(e.target.value)} className='inputStyle rounded-5' type='text' placeholder='Enter amount' /></div>
                <div className='col-12 col-lg-2 text-center'>
                    <SyncAltRounded className='mb-3 text-center' sx={{ fontSize: '3em', background: '#0009E8', borderRadius: '50%', marginLeft: 5, marginRight: 5, padding: '5px' }} />
                </div>
                <div className='mb-3 col-12 col-lg-5'><input className='inputStyle rounded-5' type='text' placeholder='0.0000' /></div>
            </div>
            <div className='mb-3 align-items-center'><Wallet /><span>Balance:</span><span className='btn btn-sm rounded-5 text-dark' style={{ background: '#FFFFFF' }}>{walletBalance} SOL</span></div>
            <hr />
            <div className='d-flex flex-wrap flex-lg-nowrap align-items-center'>
                <div className="col-lg-6 col-12 me-lg-2 mb-3">
                    <input type='text' className='w-100 rounded-5 inputStyleBg' placeholder='Enter/paste Solana address' />
                </div>
                <div className='col-lg-6 col-12 mb-3'>
                    <button onClick={() => { }} className='rounded-5 w-100 btn text-white inputMain shadow btn-lg'><SyncAltRounded sx={{ fontSize: '30px', background: '#0009E8', borderRadius: '50%', padding: '5px' }} /> Approve token swap</button>
                </div>
            </div>
        </div>
    );
}
