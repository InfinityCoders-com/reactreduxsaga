import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {confirm} from 'src/services/notify';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import {Card, CardHeader} from 'material-ui/Card';

const ListAllPolicyDocument = ({policyDocuments, submitNewListofDocs}) => {
  const deleteDocument = (delDoc) => {
    let newList = _.filter(policyDocuments, function (o) { return o.name !== delDoc.name; });
    confirm('Are you sure ?', 'Do you want to delete this Document ?', 'warning').then((res) => {
      if (res) {
        submitNewListofDocs(newList);
      }
    });
  };
  let allDocuments = _.map(policyDocuments, (doc, i) => {
    return (
      <div key={i} className='m-y-sm policyDocumentsList  clear'>
        <h5>{doc.name}</h5>
        <a href={doc.link} target="_blank" onClick={() => this.updateReadStatus(doc)}>{doc.link}</a>
        <IconButton
          tooltip="Delete Document"
          tooltipPosition="top-left"
          className="pull-right btn-responsive icon-button p-0 "
          children={<Delete color='#B71C1C' />}
          onClick={(evt) => {
            evt.stopPropagation();
            deleteDocument(doc);
          }
        }
        />
      </div>
    );
  });
  return (
    <div className="row">
      <div className="col-md-12">
        <Card>
          <CardHeader title="Policy Documents List" />
        </Card>
        {allDocuments}
      </div>
    </div>
  );
};

ListAllPolicyDocument.PropTypes = {
  policyDocuments:     PropTypes.array.isRequired,
  submitNewListofDocs: PropTypes.func.isRequired
};

export default ListAllPolicyDocument;
