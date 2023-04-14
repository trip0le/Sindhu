import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BankingContract from "../../contracts/Banking.json";
import getWeb3 from "../../getWeb3";
import Loader from "react-loader-spinner";
import "./AccountDetails.css";

const AccountDetails = () => {
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);

  const [bankingAccount, setBankingAccount] = useState(undefined);
  const [createdDate, setCreatedDate] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [bankingAccountBalance, setBankingAccountBalance] = useState(undefined);

  const [balanceAdded, setBalanceAdded] = useState("");

  const [balanceWithdrawn, setBalanceWithdrawn] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getBasicDetails = async () => {
      try {
        // Get network provider and web3 instance.*
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.*
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.*
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = BankingContract.networks[networkId];
        setContractAddress(deployedNetwork.address);
        console.log(deployedNetwork.address);

        const instance = new web3.eth.Contract(
          BankingContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3);
        setAccount(accounts[0]);
        setContract(instance);
      } catch (error) {
        // Catch any errors for any of the above operations.*
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    getBasicDetails();
  });

  useEffect(() => {
    const getContractDetails = async () => {

      await contract.methods
        .accounts(id)
        .call()
        .then((res) => {
          setBankingAccount(res);
          setBankingAccountBalance(res.balance);

          setCreatedDate(new Date(res.createdAt * 1000).toLocaleString());

        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      await contract.methods
        .getContractBalance()
        .call()
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {

      getContractDetails();
    }
  });

  const addBalance = async (e) => {
    e.preventDefault();
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      await contract.methods
        .addBalance(id, web3.utils.toWei(balanceAdded, "ether"), account)
        .send({ from: account, value: web3.utils.toWei(balanceAdded, "ether") })

        .then(async (res) => {
          await contract.methods
            .accounts(id)
            .call()
            .then((res) => {
              setBankingAccountBalance(res.balance);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(res);
          setBalanceAdded("");
        });
    }
  };

  const withdrawBalance = async (e) => {
    e.preventDefault();
    console.log(`${id}`);
    console.log(balanceWithdrawn);
    console.log("withdraw");
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      console.log(contract.options.address);

      await contract.methods
        .withdrawBalance(
          id,
          web3.utils.toWei(balanceWithdrawn, "ether"),
          account
        )
        .send({ from: account, to: contract.options.address })
        .then(async (res) => {
          await contract.methods
            .accounts(id)
            .call()
            .then((res) => {
              setBankingAccountBalance(res.balance);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(res);
          setBalanceWithdrawn("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!web3) {
    return (
      <div className="default">
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000}
        />
      </div>
    );
  }
  return (
    <div className="account-details-section">
      <div className="account-details-grid-wrapper">
        <div className="account-card flex">
          {!loading ? (
            <div className="inner-wrapper">
              <h4>Unique ID : {id}</h4>
              <h4>Blood Type : {bankingAccount.name}</h4>
              <h4>Blood Unit (in litre) : {bankingAccountBalance} L</h4>
              <h4>Hospital Name : {bankingAccount.location}</h4>
              <h4>Registered At : {createdDate}</h4>
            </div>
          ) : null}
        </div>
        <div className="add-balance-card flex">
          <div classname="inner-wrapper2">
            <h4>Receive Blood</h4>
            <div className="child">
              <form onSubmit={addBalance} className="transact-form">
                <input
                  className="form-input-field"
                  type="number"
                  placeholder="Add amount"
                  value={balanceAdded}
                  onChange={(e) => {
                    setBalanceAdded(e.target.value);
                  }}
                ></input>
                <button className="submit-button" type="submit">
                  RECEIVE
                </button>
              </form>
            </div>
          </div>
          <div classname="inner-wrapper2">
            <h4>Issue Blood : Residual balance must be 2 after deducting the amount</h4>
            <div className="child">
              <form onSubmit={withdrawBalance} className="transact-form">
                <input
                  className="form-input-field"
                  type="number"
                  placeholder="Add amount"
                  value={balanceWithdrawn}
                  onChange={(e) => {
                    setBalanceWithdrawn(e.target.value);
                  }}
                ></input>
                <button className="submit-button" type="submit">
                  ISSUE
                </button>
              </form>
            </div>
          </div>
          <div classname="inner-wrapper2">
            <h4>Transfer Blood to another hospital</h4>
            <div className="child">
              <form onSubmit={withdrawBalance} className="transact-form">
                <button
                  className="submit-button-2"
                  type="submit"
                  onClick={() => {
                    window.location = `/transfer/${id}`;
                  }}
                >
                  TRANSFER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;