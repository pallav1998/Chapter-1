import React from "react";
import { ethers } from "ethers";
import Wallet from "../contracts/MultiSignerWallet.json";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Home = () => {
  const [newAddress, setNewAddress] = React.useState("");

  const handleGetProvider = () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "HTTP://127.0.0.1:7545",
      5777,
    );
    return provider;
  };

  const handleConnect = async () => {
    const provider = handleGetProvider();
    const signer = await provider.getSigner();
    return { signer, provider };
  };

  const handleAddNewOwner = async () => {
    const { signer, provider } = await handleConnect();
  };

  const getAllOwners = async () => {
    const { signer, provider } = handleConnect();
    const wallet = await new ethers.Contract(
      Wallet.networks["5777"].address,
      Wallet.abi,
      provider,
    );
    // wallet.getOwners({ from: accounts[0] }).then((res) => {
    //   console.log(res);
    // });
  };

  React.useEffect(() => {
    handleConnect();
  }, []);

  return (
    <div>
      <h2>Multi Signer Wallet</h2>
      <TextField
        label="New Owner"
        variant="outlined"
        onChange={(e) => setNewAddress(e.target.value)}
      />
      <br />
      <Button variant="contained" onClick={handleAddNewOwner}>
        Add
      </Button>
      <hr />
      <Button variant="contained" onClick={getAllOwners}>
        Add
      </Button>
    </div>
  );
};
