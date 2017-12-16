import React from 'react';
import _ from 'lodash';
import {CONFIG} from 'src/config/index';
import {getToken} from 'src/services/generic';

class AttendanceSheatForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user_id:  '',
      open:     false,
      doc_type: ''
    };
  }
  render () {
    let styles = _.cloneDeep(this.constructor.styles);
    return (
      <div>
        <div>
          <form action={CONFIG.upload_attendance_url} method="POST" encType="multipart/form-data">
            <div className="form-group">
              <input type="hidden" name="token" value={getToken()} />
              <div style={styles.file}>
                <input type="file" name="image" required />
              </div>
              <input type="submit" name="submit" value="Upload" className="col-xs-12 md-btn md-raised indigo" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AttendanceSheatForm.styles = {
  file: {
    padding:      '20px',
    border:       '1px solid rgba(128, 128, 128, 0.32)',
    marginBottom: '12px',
    borderRadius: '5px'
  }
};

export default AttendanceSheatForm;
