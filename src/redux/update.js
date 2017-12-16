import update from 'immutability-helper';

update.extend('$setInitialState', (payload, original) => {
  return update(original, {
    data:      {$set: []},
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  });
});
update.extend('$setRequestLoading', (payload, original) => {
  return update(original, {
    isLoading: {$set: true},
    isError:   {$set: false},
    isSuccess: {$set: false},
    message:   {$set: ''}
  });
});
update.extend('$setRequestSuccess', (payload, original) => {
  return update(original, {
    data:      {$set: payload},
    isLoading: {$set: false},
    isError:   {$set: false},
    isSuccess: {$set: true},
    message:   {$set: ''}
  });
});
update.extend('$setSuccessMessage', (payload, original) => {
  return update(original, {
    isLoading: {$set: false},
    isSuccess: {$set: true},
    isError:   {$set: false},
    message:   {$set: payload}
  });
});
update.extend('$setRequestError', (payload, original) => {
  return update(original, {
    isLoading: {$set: false},
    isSuccess: {$set: false},
    isError:   {$set: true},
    message:   {$set: payload}
  });
});
