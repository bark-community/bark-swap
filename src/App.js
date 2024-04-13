import './App.css';
import './style.css';
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import nacl from "tweetnacl";
import HomePage from './pages/homepage';


function App() {
  const { publicKey, signMessage, connected } = useWallet();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  useEffect(() => {
    if (!connected) {
      setError("");
      setMessage("");
      setSignature("");
      setSignedMessage("");
      setVerified();
    }
  }, [connected]);

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const _signMessage = async () => {
    try {
      console.log("signing message");
      if (!publicKey) throw new WalletNotConnectedError();
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);
      setSignedMessage(encodedMessage);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();
      const verified = nacl.sign.detached.verify(
        signedMessage,
        signature,
        publicKey.toBuffer()
      );
      setVerified(verified);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <>

      <HomePage />



    </>
  );
}

export default App;
