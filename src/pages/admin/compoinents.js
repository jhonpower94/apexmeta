import { LoadingButton } from "@mui/lab";
import React from "react";
import {
    activateAccount,
    addNotification,
    deletedocument,
    sendMessage,
    updateUserBalance,
} from "../../config/services";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseinit";
import { ajax } from "rxjs/ajax";

const getMode = (key, data) => {
  switch (key) {
    case "USDT":
      return {
        name: "USDT",
        address: "USDT Address",
        receipient: data.wallet,
      };
    case "BTC":
      return {
        name: "BTC",
        address: "BTC Address",
        receipient: data.wallet,
      };
    default:
      return {
        name: "",
        address: "Receivers Account",
        receipient: data.accountnumber,
      };
  }
};

export function ConfirmKyc({ row }) {
  const [loading, setLoading] = React.useState(false);

  const verification = (status, data) => {
    setLoading(true);
    activateAccount(data.uid, status).then(() => {
      sendMessage(
        `Your account verification was Successfully confirmed`,
        "KYC Confirmation",
        data.email,
        `${data.firstName} ${data.lastName}`
      )
        .then((result) => {
          setLoading(false);
          console.log(result);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
    });
  };
  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      disableElevation
      color={"success"}
      onClick={() => verification(true, row)}
    >
      {"confirm"}
    </LoadingButton>
  );
}

export function DeclineKyc({ row }) {
  const [loading, setLoading] = React.useState(false);

  const verification = (status, data) => {
    setLoading(true);
    activateAccount(data.uid, status).then(() => {
      sendMessage(
        `Your account verification was Declined, please submit your document again`,
        "KYC Declined",
        data.email,
        `${data.firstName} ${data.lastName}`
      )
        .then((result) => {
          setLoading(false);
          console.log(result);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
    });
  };
  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      disableElevation
      color={"warning"}
      onClick={() => verification(false, row)}
    >
      {"Decline"}
    </LoadingButton>
  );
}

export function ConfirmTransaction({ row, setOpenSnackbar }) {
  const [loading, setLoading] = React.useState(false);

  const confirm = (data) => {
    setLoading(true);
    const userRef = doc(db, "users", data.userid, "account", data.type);
    getDoc(userRef).then((user) => {
      console.log(user.data());
      const oldbalance = user.data().balance;
      const newbalance = oldbalance - parseInt(data.amount);

      updateUserBalance(data.userid, data.type, newbalance).then(() => {
        const usertrxRef = doc(
          db,
          "users",
          data.userid,
          "transactions",
          data.transactionid
        );
        setDoc(usertrxRef, { pending: false }, { merge: true }).then(() => {
          const trxRef = doc(db, "transactions", data.uid);
          setDoc(trxRef, { pending: false }, { merge: true }).then(() => {
            addNotification(
              data.userid,
              "Debit",
              `your transaction of ${
                data.amount
              } has been successfully confirmed.`
            ).then(() => {
              sendMessage(
                `You have successfully made a ${
                  getMode(data.mode, data).name
                } transfer of <strong>$${
                  data.amount
                }</strong> from your account.
                <br/>
                <br/>${getMode(data.mode, data).address}:
                ${getMode(data.mode, data).receipient}
                <br /><br />
                Your ${
                  data.type
                } account remaining balance is <strong>$${newbalance}</strong>.`,
                "Transaction confirmation",
                data.email,
                `${data.fullname}`
              )
                .then((result) => {
                  console.log(result);
                  setLoading(false);
                  setOpenSnackbar(true);
                })
                .catch((error) => {
                  console.log("error", error);
                  setLoading(false);
                });
            });
          });
        });
      });
    });
  };
  return (
    <LoadingButton
      disabled={row.pending ? false : true}
      loading={loading}
      variant="contained"
      disableElevation
      onClick={() => {
        confirm(row);
      }}
    >
      confirm
    </LoadingButton>
  );
}

export function ConfirmLoan({ row, setOpenSnackbar }) {
  const [loading, setLoading] = React.useState(false);

  const confirm = (data) => {
    setLoading(true);
    const userRef = doc(db, "users", data.userid, "account", "overdraft");
    getDoc(userRef).then((user) => {
      console.log(user.data());
      const oldbalance = user.data().balance;
      const newbalance = oldbalance + parseInt(data.amount);

      updateUserBalance(data.userid, "overdraft", newbalance).then(() => {
        const trxRef = doc(db, "loan", data.uid);
        setDoc(
          trxRef,
          { pending: false, date: Timestamp.fromDate(new Date()) },
          { merge: true }
        ).then(() => {
          addNotification(
            data.userid,
            "Loan Credit",
            `your Loan request of ${data.amount} was successfully confirmed`
          ).then(() => {
            sendMessage(
              `your Loan request of <strong>$${
                data.amount
              }</strong> was successfully confirmed and credited to your account.
              <br/>
              <br/>Amount: $${data.amount} 
              <br/>Duration: ${data.duration} months
              <br /><br />
              Your overdraft account remaining balance is <strong>$${newbalance}</strong>.`,
              "Loan Confirmation",
              data.email,
              `${data.name}`
            )
              .then((result) => {
                console.log(result);
                setLoading(false);
                setOpenSnackbar(true);
              })
              .catch((error) => {
                console.log("error", error);
                setLoading(false);
              });
          });
        });
      });
    });
  };
  return (
    <LoadingButton
      disabled={row.pending ? false : true}
      loading={loading}
      variant="contained"
      disableElevation
      onClick={() => {
        confirm(row);
      }}
    >
      confirm
    </LoadingButton>
  );
}

export function DeleteUser({ row }) {
  const [loading, setLoading] = React.useState(false);

  const deleteuser = (uid) => {
    setLoading(true);
    ajax({
      url: "https://expresspages-chi.vercel.app/trustpayd/delete",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        uid: uid,
      },
    }).subscribe(() => {
      deletedocument(uid).then(() => {
        setLoading(false);
        console.log("deleted");
      });
    });
  };

  return (
    <LoadingButton
      loading={loading}
      fullWidth
      size="large"
      variant="contained"
      disableElevation
      onClick={() => {
        deleteuser(row.uid);
      }}
    >
      Delete user
    </LoadingButton>
  );
}

export function AddRemoveAdmin({ row }) {
  const [loading, setLoading] = React.useState(false);

  const makeAdmin = (data) => {
    setLoading(true);
    console.log(data);

    const userRef = doc(db, "users", data.uid);
    setDoc(userRef, { admin: !data.admin }, { merge: true }).then(() => {
      setLoading(false);
    });
  };

  return (
    <LoadingButton
      loading={loading}
      fullWidth
      size="large"
      variant="contained"
      disableElevation
      onClick={() => makeAdmin(row)}
    >
      {row.admin ? "remove admin" : "make admin"}
    </LoadingButton>
  );
}

export function ConfirmCardOrder({ row, setOpenSnackbar }) {
  const [loading, setLoading] = React.useState(false);

  const confirm = () => {
    setLoading(true);
    const userCardRef = doc(db, "users", row.userid, "account", "savings");
    setDoc(
      userCardRef,
      { cardactive: true, cardpin: row.pin },
      { merge: true }
    ).then(() => {
      const cardRef = doc(db, "cardorder", row.userid);
      setDoc(cardRef, { active: true }, { merge: true }).then(() => {
        addNotification(
          row.userid,
          "Card Request",
          `Your Card request was successfully confirmed`
        ).then(() => {
          sendMessage(
            `your Card request was successfully confirmed,
            <br/>You can now use your card to make transactions.`,
            row.email,
            `${row.fullname}`
          )
            .then((result) => {
              console.log(result);
              setLoading(false);
              setOpenSnackbar(true);
            })
            .catch((error) => {
              console.log("error", error);
              setLoading(false);
            });
        });
      });
    });
  };

  return (
    <LoadingButton
      loading={loading}
      size="large"
      variant="contained"
      disableElevation
      onClick={confirm}
      disabled={row.active}
    >
      Confirm
    </LoadingButton>
  );
}
