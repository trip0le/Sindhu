import React, { useState, useEffect } from "react";
import BankingContract from "../../contracts/Banking.json";
import getWeb3 from "../../getWeb3";
import Table from "react-bootstrap/Table";

const DisplayAccount = () => {
  const [contract, setContract] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [loading, setLoading] = useState(true);


  const [transactionhistories, setTransactionhistories] = useState([]);

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
  }, []);

  useEffect(() => {
    const getContractDetails = async () => {
      const transaction = await contract.methods.transaction().call();
      console.log(transaction);

      for (let i = 1; i <= transaction; i++) {
        await contract.methods
          .transactions(i)
          .call()

          .then((res) => {
            var transachist = transactionhistories;
            transachist.push({
              transacNum: res.transacNum,
              name: res.name,
              location: res.location,
              currentBalance: res.currentBalance,
              amountTransacted: res.amountTransacted,
              createdAt: new Date(res.createdAt * 1000).toLocaleString(),
              transacType: res.transacType,
              accountSerialNumber: res.accountSerialNumber
            });
            setTransactionhistories(transachist);
            console.log(res);
            console.log(res.transacNum);
            console.log(transactionhistories);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setLoading(false);
    };
    if (
      typeof contract !== "undefined" &&
      typeof account !== "undefined" &&
      typeof web3 !== "undefined"
    ) {
      getContractDetails();
    }
  }, [web3, account, contract, transactionhistories]);


  if (!web3) {
    return <div>Loading web3, accounts, and contracts...</div>;
  }
  return (
    <div className="trasaction-history-table">
      <h3 className="Heading">Display Transactions</h3>
      <Table striped hover responsive="md" variant="bordered" size="sm">
        <thead>
          <tr>
            <th>Blood Type</th>
            <th>Initiator Hospital</th>
            <th>Transaction ID</th>
            <th>Blood Balance of Initiator Hospital, in L</th>
            <th>Blood Transacted, in L</th>
            <th>Transacted At</th>
            <th>Transaction Type</th>
            <th>Unique ID</th>
          </tr>
        </thead>
        <tbody>
          {!loading
            ? transactionhistories.map((transactions) => {
              return (
                <tr key={transactions.transacNum}>
                  <td>{transactions.name}</td>
                  <td>{transactions.location}</td>
                  <td>{transactions.transacNum}</td>
                  <td>{transactions.currentBalance}</td>
                  <td>{transactions.amountTransacted}</td>
                  <td>{transactions.createdAt}</td>
                  <td>{transactions.transacType}</td>
                  <td>{transactions.accountSerialNumber}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayAccount;
