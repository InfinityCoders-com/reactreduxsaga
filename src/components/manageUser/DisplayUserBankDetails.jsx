import React from 'react';
import PropTypes from 'prop-types';

const DisplayUserBankDetails = ({ userBankDetails }) => {
  let bankName = 'Not Updated';
  let bankAccountNo = 'Not Updated';
  let ifsc = 'Not Updated';
  let bankAddress = 'Not Updated';

  if (userBankDetails !== null) {
    bankName = userBankDetails.bank_name;
    bankAccountNo = userBankDetails.bank_account_no;
    ifsc = userBankDetails.ifsc;
    bankAddress = userBankDetails.bank_address;
  }
  return (
    <div>
      <h6 className="text-center">Bank Details</h6>
      <br />
      <ul className="list-group m-b">
        <li className="list-group-item">
          <div className="clear">
            <div className="_500 block">{bankName}</div>
            <span className="text-muted">Bank Name</span>
          </div>
        </li>
        <li className="list-group-item">
          <div className="clear">
            <div className="_500 block">{bankAccountNo}</div>
            <span className="text-muted">Bank Account Number</span>
          </div>
        </li>
        <li className="list-group-item">
          <div className="clear">
            <div className="_500 block">{ifsc}</div>
            <span className="text-muted">IFSC Code</span>
          </div>
        </li>
        <li className="list-group-item">
          <div className="clear">
            <div className="_500 block">{bankAddress}</div>
            <span className="text-muted">Bank Address</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

DisplayUserBankDetails.PropTypes = {
  bank_name: PropTypes.string.isRequired,
  bank_account_no: PropTypes.string.isRequired,
  ifsc: PropTypes.string.isRequired,
  bank_address: PropTypes.string.isRequired
};

export default DisplayUserBankDetails;
