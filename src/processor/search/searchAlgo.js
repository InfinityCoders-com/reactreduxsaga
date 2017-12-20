import _ from 'lodash';

export const searchAlgo = (inputString, author, date, type, data) => {
  console.log( inputString.length, inputString, author.length, author,date.length, date,type.length, type, '4 ==============')
  console.log(data, 'data search algo ===================');
  let priority = [];
  let changedInput = '';
  let result = data;
  if(inputString.length > 0){
    changedInput = 'inputString';
  }
  if(author.length > 0){
    changedInput = 'author';

  }
  if(date.length > 0){
    changedInput = 'date';

  }
  if(type.length > 0){
    changedInput = 'type';

  }

  console.log(changedInput, 'changedInput ============')
  switch(changedInput){
    case 'inputString': {
      // result = _.filter(data, (o) => { return o.author == author});
      break;
    }
    case 'author': {
      result = _.filter(data, (o) => { return o.author == author});
      break;
    }
    case 'date': {
      result = _.filter(data, (o) => { return o.date == date});
      break;
    }
    case 'type': {
      result = _.filter(data, (o) => { return o.type == type});
      break;
    }
    default: {

    }
  }
  return result;
};
